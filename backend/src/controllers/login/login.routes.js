#!/usr/bin/env node

import { Router } from 'express'
import { pool, SECRET_JWK_KEY } from '../../models/db.js'
import { schemaRegister, schemaLogin } from '../../routes/SchemaRegister.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const routerRegiste = Router()

routerRegiste.post('/login', async (req, res) => {
  try {
    const vLogin = schemaLogin.parse(req.body)

    const [usuarios] = await pool.query(
      'SELECT * FROM usuarios WHERE correo = ?',
      [vLogin.correo]
    )

    if (usuarios.length === 0) {
      return res.status(404).json({
        message: 'No existen usuarios con este correo'
      })
    }

    const isPasswordValid = await bcrypt.compare(
      vLogin.contrasena,
      usuarios[0].contrasena
    )
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Usuario o contraseña incorrectos'
      })
    }

    const token = jwt.sign(
      {
        id: usuarios[0].id,
        nombre: usuarios[0].nombre,
        correo: usuarios[0].correo
      },
      SECRET_JWK_KEY,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 72000000
    })

    return res.status(200).json({
      message: 'Login exitoso',
      nombre: usuarios[0].nombre
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.message || error.errors || error
    })
  }
})

routerRegiste.post('/register', async (req, res) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const schemaRegistro = schemaRegister.parse(req.body)

    const [existingUser] = await connection.query(
      'SELECT * FROM usuarios WHERE correo = ?',
      [schemaRegistro.correo]
    )

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' })
    }

    const [existingPhone] = await connection.query(
      'SELECT * FROM usuarios WHERE telefono = ?',
      [schemaRegistro.telefono]
    )

    if (existingPhone.length > 0) {
      return res.status(400).json({ message: 'El teléfono ya está registrado' })
    }

    const hashPassword = await bcrypt.hash(schemaRegistro.contrasena, 10)

    let [rowsRol] = await connection.query(
      'SELECT id FROM roles WHERE nombre_rol = ?',
      [schemaRegistro.nombre_rol]
    )

    let idRol
    if (rowsRol.length > 0) {
      idRol = rowsRol[0].id
    } else {
      await connection.query(
        'INSERT INTO roles (nombre_rol, descripcion_rol) VALUES (?, ?)',
        [schemaRegistro.nombre_rol, schemaRegistro.descripcion_rol]
      )
      const [newRol] = await connection.query(
        'SELECT id FROM roles WHERE nombre_rol = ?',
        [schemaRegistro.nombre_rol]
      )
      idRol = newRol[0].id
    }

    const [userResult] = await connection.query(
      'INSERT INTO usuarios (nombre, correo, telefono, contrasena, rol_id) VALUES (?, ?, ?, ?, ?)',
      [
        schemaRegistro.nombre,
        schemaRegistro.correo,
        schemaRegistro.telefono,
        hashPassword,
        idRol
      ]
    )

    const usuarioId = userResult.insertId || userResult[0]?.id

    for (const permisoNombre of schemaRegistro.nombre_permiso) {
      let [perm] = await connection.query(
        'SELECT id FROM permisos WHERE nombre_permiso = ?',
        [permisoNombre]
      )

      let idPermiso
      if (perm.length > 0) {
        idPermiso = perm[0].id
      } else {
        await connection.query(
          'INSERT INTO permisos (nombre_permiso) VALUES (?)',
          [permisoNombre]
        )
        const [newPerm] = await connection.query(
          'SELECT id FROM permisos WHERE nombre_permiso = ?',
          [permisoNombre]
        )
        idPermiso = newPerm[0].id
      }

      await connection.query(
        'INSERT IGNORE INTO roles_permisos (permiso_id, rol_id) VALUES (?, ?)',
        [idPermiso, idRol]
      )

      await connection.query(
        'INSERT IGNORE INTO usuarios_permisos (usuario_id, permiso_id) VALUES (?, ?)',
        [usuarioId, idPermiso]
      )
    }

    await connection.commit()

    res.status(201).json({
      message: 'Registro Exitoso',
      nombre: schemaRegistro.nombre,
      telefono: schemaRegistro.telefono,
      correo: schemaRegistro.correo
    })
  } catch (error) {
    await connection.rollback()
    console.error('Error en registro:', error)
    res.status(500).json({ error: 'Error al registrar usuario' })
  } finally {
    connection.release()
  }
})

routerRegiste.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  })
  res.status(200).json({ message: 'Logout exitoso' })
})

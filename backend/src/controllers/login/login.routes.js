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
  try {
    const schemaRegistro = schemaRegister.parse(req.body)
    const hashPassword = await bcrypt.hash(schemaRegistro.contrasena, 10)

    await pool.query('INSERT INTO permisos (nombre_permiso) VALUES (?)', [
      schemaRegistro.nombre_permiso
    ])
    const [rowsPerm] = await pool.query(
      'SELECT id FROM permisos WHERE nombre_permiso = ?',
      [schemaRegistro.nombre_permiso]
    )
    const idPermiso = rowsPerm[0].id

    await pool.query(
      'INSERT INTO roles (nombre_rol, descripcion_rol) VALUES (?, ?)',
      [schemaRegistro.nombre_rol, schemaRegistro.descripcion_rol]
    )
    const [rowsRol] = await pool.query(
      'SELECT id FROM roles WHERE nombre_rol = ?',
      [schemaRegistro.nombre_rol]
    )
    const idRol = rowsRol[0].id

    await pool.query(
      'INSERT IGNORE INTO roles_permisos (permiso_id, rol_id) VALUES (?, ?)',
      [idPermiso, idRol]
    )

    await pool.query(
      'INSERT INTO usuarios (nombre, correo, telefono, contrasena, rol_id) VALUES (?, ?, ?, ?, ?)',
      [
        schemaRegistro.nombre,
        schemaRegistro.correo,
        schemaRegistro.telefono,
        hashPassword,
        idRol
      ]
    )

    res.status(201).json({
      message: 'Registro Exitoso',
      nombre: schemaRegistro.nombre,
      telefono: schemaRegistro.telefono,
      correo: schemaRegistro.correo
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ error: 'Error al registrar usuario' })
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

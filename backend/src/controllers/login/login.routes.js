#!/usr/bin/env node

import { Router } from 'express'
import { pool, SECRET_JWK_KEY } from '../../models/db.js'
import {
  schemaRegister,
  schemaLogin,
  schemaRoles,
  schemaPermiso
} from '../../routes/SchemaRegister.js'
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
    const validacionRoles = schemaRoles.parse(req.body)
    const validacionPermiso = schemaPermiso.parse(req.body)
    const hashPassword = await bcrypt.hash(schemaRegistro.contrasena, 10)

    const [existingPermiso] = await pool.query(
      'SELECT id FROM permisos WHERE nombre_permiso = ?',
      [validacionPermiso.nombre_permiso]
    )

    let idPermiso

    if (existingPermiso.length > 0) {
      idPermiso = existingPermiso[0].id
    } else {
      const [permInsert] = await pool.query(
        'INSERT INTO permisos (nombre_permiso) VALUES (?)',
        [validacionPermiso.nombre_permiso]
      )
      idPermiso = permInsert.insertId
    }

    const [existingRol] = await pool.query(
      'SELECT id FROM roles WHERE nombre_rol = ?',
      [validacionRoles.nombre_rol]
    )

    let idRol

    if (existingRol.length > 0) {
      idRol = existingRol[0].id
    } else {
      const [rolInsert] = await pool.query(
        'INSERT INTO roles (nombre_rol, descripcion_rol) VALUES (?, ?)',
        [validacionRoles.nombre_rol, validacionRoles.descripcion_rol]
      )
      idRol = rolInsert.insertId
    }

    const [existingRel] = await pool.query(
      'SELECT * FROM roles_permisos WHERE rol_id = ? AND permiso_id = ?',
      [idRol, idPermiso]
    )

    if (existingRel.length === 0) {
      await pool.query(
        'INSERT INTO roles_permisos (permiso_id, rol_id) VALUES (?, ?)',
        [idPermiso, idRol]
      )
    }

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
    res.status(500).json({
      message: 'Error internal server',
      error: error.message || error
    })
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

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

    const [empresa] = await pool.query(
      'SELECT * FROM usuarios WHERE correo = ?',
      [vLogin.correo]
    )

    if (empresa.length === 0) {
      return res.status(404).json({
        message: 'No existen usuarios con este correo'
      })
    }

    const isPasswordValid = await bcrypt.compare(
      vLogin.contrasena,
      empresa[0].contrasena
    )
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Usuario o contraseña incorrectos'
      })
    }

    const token = jwt.sign(
      {
        id: empresa[0].id,
        nombre_empresa: empresa[0].nombre_empresa,
        correo: empresa[0].correo
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
      empresa: empresa[0].nombre_empresa
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

    const [dataRoles] = await pool.query(
      'INSERT INTO roles (nombre_rol, descripcion_rol) VALUES (?,?)',
      [validacionRoles.nombre_rol, validacionRoles.descripcion_rol]
    )

    const idRoles = dataRoles.insertId

    const [dataPermisos] = await pool.query(
      'INSERT INTO permisos (nombre) VALUES (?)',
      [validacionPermiso.nombre]
    )

    const idPermiso = dataPermisos.insertId

    await pool.query(
      'INSERT INTO roles_permisos (permiso_id, rol_id) VALUES (?,?)',
      [idPermiso, idRoles]
    )

    await pool.query(
      'INSERT INTO usuarios (nombre, correo, telefono, contrasena, rol_id) VALUES (?,?,?,?,?)',
      [
        schemaRegistro.nombre,
        schemaRegistro.correo,
        schemaRegistro.telefono,
        hashPassword,
        idRoles
      ]
    )

    res.status(201).json({
      message: 'Registro Exitoso',
      nombre: schemaRegistro.nombre,
      telefono: schemaRegistro.telefono,
      correo: schemaRegistro.correo
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error internal server',
      error: error.message || error.errors || error
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

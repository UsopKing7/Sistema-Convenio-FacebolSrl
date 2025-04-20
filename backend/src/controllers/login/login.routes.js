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

    const [empresa] = await pool.query(
      'SELECT * FROM empresas WHERE correo = ?', [vLogin.correo]
    )

    if (empresa.length === 0) {
      return res.status(404).json({
        message: 'No existe una empresa con ese correo'
      })
    }

    const isPasswordValid = await bcrypt.compare(vLogin.contrasena, empresa[0].contrasena)
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Usuario o contraseña incorrectos'
      })
    }

    const token = jwt.sign({
      id: empresa[0].id,
      nombre_empresa: empresa[0].nombre_empresa,
      correo: empresa[0].correo
    }, SECRET_JWK_KEY, { expiresIn: '1h' })

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
    const hashPassword = await bcrypt.hash(schemaRegistro.contrasena, 10)
    await pool.query(
      'INSERT INTO empresas (nombre_empresa, representante, celular, correo, descripcion, nit, contrasena) VALUES (?,?,?,?,?,?,?)',
      [
        schemaRegistro.nombre_empresa,
        schemaRegistro.representante,
        schemaRegistro.celular,
        schemaRegistro.correo,
        schemaRegistro.descripcion,
        schemaRegistro.nit,
        hashPassword
      ]
    )
    res.status(201).json({
      message: 'Empresa registrada con exito',
      empresa: schemaRegistro.nombre_empresa
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error internal server',
      error: error.message || error.errors || error
    })
  }
})

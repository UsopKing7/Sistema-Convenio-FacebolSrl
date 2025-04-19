#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { schemaRegister } from '../../routes/SchemaRegister.js'
import bcrypt from 'bcrypt'

export const routerRegiste = Router()

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

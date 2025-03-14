import { Router } from 'express'
import { pool } from '../models/db.js'
import { validacion } from '../routes/validacion.routes.js';
import bcrypt from 'bcrypt'

export const createRouter = Router()

createRouter.post('/', async(req, res) => {
  try {
    const newCompani = validacion.parse(req.body)
    const hashpasswd = await bcrypt.hash(newCompani.passwd, 10)

    const [data] = await pool.query
    ('INSERT INTO companies (nombre, gmail, phone, direccion, passwd, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [
        newCompani.nombre,
        newCompani.gmail,
        newCompani.phone,
        newCompani.direccion,
        hashpasswd,
        newCompani.estado
      ]
    )

    res.status(201).json({ message: 'Empresa registrada con exito...', empresaId: data.insertId})
  } catch (err) {
    return res.status(400).json({ err: err.message || 'error en la solicitud'})
  }
})
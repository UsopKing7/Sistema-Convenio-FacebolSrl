import { Router } from 'express'
import { pool } from '../models/db.js'
import { validation } from '../routes/validation.routes.js';
import bcrypt from 'bcrypt'

export const createRouter = Router()

createRouter.post('/', async(req, res) => {
  try {
    const newCompanies = validation.parse(req.body)
    const hashPassword = await bcrypt.hash(newCompanies.password, 10)

    const [data] = await pool.query
    ('INSERT INTO companies (name, email, phone, address, password, state) VALUES (?, ?, ?, ?, ?, ?)',
      [
        newCompanies.name,
        newCompanies.email,
        newCompanies.phone,
        newCompanies.address,
        hashPassword,
        newCompanies.state
      ]
    )

    res.status(201).json({ message: 'successfully registered company', idCompanies: data.insertId})
  } catch (err) {
    return res.status(400).json({ err: err.message || 'error in the request'})
  }
})

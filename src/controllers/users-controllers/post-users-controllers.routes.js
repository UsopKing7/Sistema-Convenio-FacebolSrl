#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validation }  from '../../routes/validation-users.routes.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  try {
    const newUsers = validation.parse(req.body)
    const hashedPassword = await bcrypt.hash(newUsers.password, 10)

    const [company] = await pool.query('SELECT id FROM companies WHERE id = ?', [newUsers.companies_id])

    if (company.length === 0) return res.status(404).json({ message: 'company not found "400"'})

    await pool.query('INSERT INTO users (companies_id, name, email, password, rol) VALUES (?, ?, ?, ?, ?)', 
      [
        newUsers.companies_id,
        newUsers.name,
        newUsers.email,
        hashedPassword,
        newUsers.rol
      ]
    )

    const token = jwt.sign({ 
      email: nuevoUsuario.email,
      isNew: true 
    }, SECRET_JWK_KEY, { expiresIn: '1m' })

    res.status(201).json({ 
      message: "Registro exitoso",
      token,
      isNewUser: true
    })
  } catch (error) {
    return res.status(500).json({ error: 'internal server error "500"', details: error.errors ?? error.message })
  }
})

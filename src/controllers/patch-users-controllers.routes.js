#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../models/db.js'
import bcrypt from 'bcrypt'
import { validationPatchUsers } from '../routes/validation-users.routes.js'

export const PatchRouterUsers = Router()

PatchRouterUsers.patch('/', async (req, res) => {
  try {
    const { id } = req.body
    const [idUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

    if (idUsers.length === 0) {
      return res.status(400).json({ message: 'id Users not font'})
    }

    const updateUsers = validationPatchUsers.parse(req.body)
    const passwordHash = await bcrypt.hash(updateUsers.password, 10)

    await pool.query('UPDATE users SET email = ?, password = ?, rol = ? WHERE id = ?', 
      [
        updateUsers.email,
        passwordHash,
        updateUsers.rol,
        id
      ]
    )
    res.status(200).json({ message: 'Users update complete', idUser: id})
  } catch (error) {
    return res.status(500).json({ error: 'internal server error "500"', details: error.errors ?? error.message })
  }
})
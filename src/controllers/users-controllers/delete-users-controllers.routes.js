#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import z from 'zod'

export const deleteUsers = Router()
const validationId = z.object({ id: z.coerce.number().int().positive() })

deleteUsers.delete('/', async (req, res) => {
  try {
    const { id } = validationId.parse(req.body)

    const [idUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    if (idUsers.length === 0) {
      return res.status(404).json({ message: 'Id user not font "404"'})
    }
  
    await pool.query(`DELETE FROM users WHERE id = ?`, [id])
    res.status(200).json({ message: 'User delete complete'})
  } catch (error) {
    return res.status(500).json({ message: 'error internal server "500"'})
  }
})

#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import bcrypt from 'bcrypt'
import { validationPatchUsers } from '../../routes/validation-users.routes.js'

export const PatchRouterUsers = Router()

PatchRouterUsers.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [idUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    if (idUsers.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' })
    }

    const updateUsers = validationPatchUsers.parse(req.body)

    let passwordHash;
    if (updateUsers.password) {
      passwordHash = await bcrypt.hash(updateUsers.password, 10)
    }

    const query = 'UPDATE users SET password = ?, rol = ? WHERE id = ?'
    const params = [
      passwordHash || idUsers[0].password,
      updateUsers.rol || idUsers[0].rol,
      id
    ]

    await pool.query(query, params)

    res.status(200).json({ message: 'Usuario actualizado correctamente', idUser: id })
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', details: error.message })
  }
})

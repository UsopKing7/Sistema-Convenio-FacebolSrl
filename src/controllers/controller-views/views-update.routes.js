#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerUpdateUsers = Router()

routerUpdateUsers.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

    if (user.length === 0) {
      return res.status(404).send('Usuario no encontrado')
    }

    res.render('patchUsers/edit-user', {
      user: user[0]
    })
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    res.status(500).send('Error interno del servidor')
  }
})

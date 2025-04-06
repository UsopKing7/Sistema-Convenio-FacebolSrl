#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerDeleteUsers = Router()

routerDeleteUsers.get('/:id', async (req, res) => {
  const { id } = req.params

  await pool.query(
    'DELETE FROM users WHERE id = ?', [id]
  )
  res.render('deleteUsers/delete-user', { id })
})

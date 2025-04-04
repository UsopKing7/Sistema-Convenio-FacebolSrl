#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validationMovementsDelete } from '../../routes/validation-movements.js'

export const routerMovementsDelete = Router()

routerMovementsDelete.delete('/', async (req, res) => {
  try {
    const movementDelete = validationMovementsDelete.parse(req.body)

    const [existId] = await pool.query(
      'SELECT * FROM company_movements WHERE id = ?', [movementDelete.id]
    )
    if (existId.length > 0) {
      const [data] = await pool.query(
        'DELETE FROM company_movements WHERE id = ?', [movementDelete.id]
      )
    }

    res.status(200).json({ message: 'movement delete complete' })
  } catch (error) {
    return res.status(500).json({ message: 'error internal server', error: error.message })
  }
})
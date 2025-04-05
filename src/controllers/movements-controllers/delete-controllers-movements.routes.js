#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validationMovementsDelete } from '../../routes/validation-movements.js'

export const routerMovementsDelete = Router()

routerMovementsDelete.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [existId] = await pool.query(
      'SELECT * FROM company_movements WHERE id = ?', [id]
    )
    if (existId.length === 0) {
      return res.status(404).json({ message: 'Movement not found' })
    }

    await pool.query(
      'DELETE FROM company_movements WHERE id = ?', [id]
    )

    res.status(200).json({ message: 'Movement deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'error internal server', error: error.message })
  }
})

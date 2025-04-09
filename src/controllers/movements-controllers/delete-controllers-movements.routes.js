#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerMovementsDelete = Router()

routerMovementsDelete.get('/:id', async (req, res) => {
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

    res.render('deleteMovements/delete-movement', { id })
  } catch (error) {
    return res.status(500).json({ message: 'error internal server', error: error.message })
  }
})

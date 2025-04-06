#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerMovementsGet = Router()

routerMovementsGet.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [movements] = await pool.query(
      'SELECT * FROM company_movements WHERE companies_id = ?', [id]
    )

    res.render('movements/movements', {
      companyId: id,
      movements
    })
  } catch (error) {
    return res.status(500).json({ message: 'error internal server', error: error.message })
  }
})

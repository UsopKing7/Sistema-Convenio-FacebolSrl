#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validationMovements } from '../../routes/validation-movements.js'

export const routerMovementsPost = Router()

routerMovementsPost.post('/', async (req, res) => {
  try {
    const newMovement = validationMovements.parse(req.body)
    
    const [idCompaniesExists] = await pool.query(
      'SELECT * FROM companies WHERE id = ?', [newMovement.companies_id]
    )

    if (idCompaniesExists.length > 0) {
      const [data] = await pool.query(
        'INSERT INTO company_movements (companies_id, movement_type, amount, description) VALUES (?, ?, ?, ?)',
        [
          newMovement.companies_id,
          newMovement.movement_type,
          newMovement.amount,
          newMovement.description
        ]
      )
      res.status(201).json({ message: 'movement create complete' })
    } else {
      return res.status(400).json({ message: 'error id not font'})
    }
  } catch (error) {
    return res.status(500).json({ message: 'error internal server', error: error.message })
  }
})

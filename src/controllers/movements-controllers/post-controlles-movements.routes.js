#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validationMovements } from '../../routes/validation-movements.js'

export const routerMovementsPost = Router()

routerMovementsPost.post('/:id', async (req, res) => {
  try {
    const { id } = req.params 
    const newMovement = req.body

    newMovement.companies_id = Number(id)
    newMovement.amount = Number(newMovement.amount)

    const validatedMovement = validationMovements.parse(newMovement)

    const [idCompaniesExists] = await pool.query(
      'SELECT * FROM companies WHERE id = ?', [newMovement.companies_id]
    )

    if (idCompaniesExists.length > 0) {
      await pool.query(
        'INSERT INTO company_movements (companies_id, movement_type, amount, description) VALUES (?, ?, ?, ?)',
        [
          validatedMovement.companies_id,
          validatedMovement.movement_type,
          validatedMovement.amount,
          validatedMovement.description
        ]
      )
      res.status(200).json({ message: 'movement register complete' })
    } else {
      return res.status(400).json({ message: 'company ID not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'internal server error', error: error.message })
  }
})

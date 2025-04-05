#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validationMovementsPatch } from '../../routes/validation-movements.js'

export const routerMovementsPatch = Router()

routerMovementsPatch.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newUpadateMovements = validationMovementsPatch.parse(req.body)

    const [movementsCompanyExists] = await pool.query(
      'SELECT * FROM companies WHERE id = ?', [newUpadateMovements.companies_id]
    )
    if (movementsCompanyExists.length > 0) {
      const [result] = await pool.query(
        `UPDATE company_movements 
         SET movement_type = ?, amount = ?, description = ? 
         WHERE id = ?`,
        [
          newUpadateMovements.movement_type,
          newUpadateMovements.amount,
          newUpadateMovements.description,
          id
        ]
      )
      res.status(200).json({ message: 'Movement updated successfully' })
    } else {
      return res.status(400).json({ message: 'error id not font', error: error.message })
    }
  } catch (error) {
    return res.status(500).json({ message: 'error internal mesage', error: error.message })
  }
})

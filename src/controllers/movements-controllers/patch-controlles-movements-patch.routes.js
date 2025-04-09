#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validationMovementsPatch } from '../../routes/validation-movements.js'

export const routerMovementsPatch = Router()

routerMovementsPatch.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newUpdateMovements = validationMovementsPatch.parse(req.body)

    const [movement] = await pool.query(
      'SELECT * FROM company_movements WHERE id = ?', [id]
    )

    if (movement.length === 0) {
      return res.status(404).json({ message: 'Movimiento no encontrado' })
    }

    const companies_id = movement[0].companies_id

    const [movementsCompanyExists] = await pool.query(
      'SELECT * FROM companies WHERE id = ?', [companies_id]
    )

    if (movementsCompanyExists.length === 0) {
      return res.status(400).json({ message: 'ID de empresa no válido' })
    }

    const [result] = await pool.query(
      `UPDATE company_movements 
       SET movement_type = ?, amount = ?, description = ? 
       WHERE id = ?`,
      [
        newUpdateMovements.movement_type,
        newUpdateMovements.amount,
        newUpdateMovements.description,
        id
      ]
    )

    return res.json({ success: true, message: 'Movimiento actualizado correctamente' })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message })
  }
})

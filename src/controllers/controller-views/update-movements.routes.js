#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerMovementsPatch_GET = Router()

routerMovementsPatch_GET.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [movement] = await pool.query(
      'SELECT * FROM company_movements WHERE id = ?', [id]
    )
    
    if (movement.length === 0) {
      return res.status(404).render('error', { message: 'Movimiento no encontrado' })
    }

    res.render('updateMovements/updateMovements', { 
      movement: movement[0] 
    })
  } catch (error) {
    console.log('Error:', error.message)
    res.status(500).render('error', { 
      message: 'Error al cargar el movimiento para edición' 
    })
  }
})

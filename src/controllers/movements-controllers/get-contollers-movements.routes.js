#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerMovementsGet = Router()

routerMovementsGet.get('/', async (req, res) => {
  try {
    const [data] = await pool.query(
      'SELECT * FROM company_movements'
    )
    if (!data) throw new Error('table not existent')

    res.status(200).json({ data })
  } catch (error) {
    return res.status(500).json({ message: 'error internal server', error: error.message})
  }
})

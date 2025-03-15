#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../models/db.js'

export const getCompanies = Router()

getCompanies.get('/', async (req, res) => {
  try {
    const [companies] = await pool.query('SELECT * FROM companies')
    return res.status(200).json({ companies })
  } catch (error) {
    return res.status(500).json({ message: 'error in the server', error: error.message})
  }
})
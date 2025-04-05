#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import z from 'zod'

export const deleteCompanies = Router()
const validationId = z.object({ id: z.coerce.number().int().positive() })

deleteCompanies.delete('/:id', async (req, res) => {
  try {
    const { id } = validationId.parse({ id: req.params.id})
    const companiesId = await pool.query(
      'SELECT * FROM companies WHERE id = ?', [id]
    )
    if (companiesId.length === 0) {
      return res.status(404).json({ message: 'id companies not font' })
    }
  
    const [data] = await pool.query(
      'DELETE FROM companies WHERE id = ?', [id]
    )
    return res.status(200).json({ message: 'companies delete complete', idDelete: data.insertId })
  } catch (error) {
    return res.status(500).json({ message: 'error server', error: error.message })
  }
})
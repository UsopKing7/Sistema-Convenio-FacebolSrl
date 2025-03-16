#!/usr/bin/env node

import { Router } from "express"
import { pool } from '../models/db.js'
import { validationPatch } from '../routes/validation.routes.js'
import bcrypt from 'bcrypt'

export const PatchRouterCompanies = Router()

PatchRouterCompanies.patch('/', async (req, res) => {
  try {
    const { id } = req.body
    const [idCompanies] = await pool.query('SELECT * FROM companies WHERE id = ?', [id])
    if (idCompanies.length === 0) {
      return res.status(400).json({ message: 'error id not font'})
    }
  
    const UpdateCompanies = validationPatch.parse(req.body)
    const passwordHash = await bcrypt.hash(UpdateCompanies.password, 10)
  
    await pool.query('UPDATE companies SET address = ?, password = ? WHERE id = ?',
      [
        UpdateCompanies.address,
        passwordHash,
        id
      ]
    )
    return res.status(200).json({ message: 'companies update complete', idUpdate: id})
  } catch (error) {
    return res.status(500).json({ error: 'internal server error "500"', details: error.errors ?? error.message })
  }
})

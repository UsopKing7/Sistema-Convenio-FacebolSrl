#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'

export const getUsers = Router()

getUsers.get('/', async(req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users')
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ message: 'error in the server', error: error.message})
  }
})
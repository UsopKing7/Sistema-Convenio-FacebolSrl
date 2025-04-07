#!/usr/bin/env node

import { Router } from 'express'

export const getInsertMovements = Router()

getInsertMovements.get('/:id', async (req, res) => {
  const { id } = req.params
  res.render('movements/registerMovements', { id })
})

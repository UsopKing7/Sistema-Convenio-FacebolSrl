#!/usr/bin/env node

import { Router } from 'express'

export const routerRegisterUsers = Router()

routerRegisterUsers.get('/:id', (req, res) => {
  const id = req.params.id
  res.render('registerUsers/registerUsers', { id })
})

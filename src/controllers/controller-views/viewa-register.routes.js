#!/usr/bin/env node

import { Router } from 'express'

export const routerRegisterUsers = Router()

routerRegisterUsers.get('/', (req, res) => {
  res.render('registerUsers/registerUsers')
})

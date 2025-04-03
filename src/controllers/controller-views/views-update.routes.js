#!/usr/bin/env node

import { Router } from 'express'

export const routerUpdateUsers = Router()

routerUpdateUsers.get('/', (req, res) => {
  res.render('patchUsers/edit-user')
})
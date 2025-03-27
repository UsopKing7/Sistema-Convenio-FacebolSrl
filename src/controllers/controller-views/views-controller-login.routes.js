#!/usr/bin/env node

import { Router } from 'express'

export const routerViewsLogin = Router()

routerViewsLogin.get('/', (req, res) => {
  console.log(req.url)
  res.render('login/login')
})

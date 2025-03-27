import { Router } from 'express'

export const routerViewsRegisterEmpresa = Router()

routerViewsRegisterEmpresa.get('/', (req, res) => {
  console.log(req.url)
  res.render('register/register')
})
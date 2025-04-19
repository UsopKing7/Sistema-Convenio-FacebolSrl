import { Router } from 'express'
import { routerSucursales } from '../controllers/sucursales/sucursal.routes.js'
import { routerRegiste } from '../controllers/login/login.routes.js'

export const middleware = Router()

middleware.use('/sucursal', routerSucursales)
middleware.use('/', routerRegiste)

middleware.use((req, res) => {
  console.log(req.url)
  return res.render('404page/404')
})

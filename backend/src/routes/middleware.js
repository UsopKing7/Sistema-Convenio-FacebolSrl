import { Router } from 'express'
import { routerSucursales } from '../controllers/sucursales/sucursal.routes.js'
import { routerRegiste } from '../controllers/login/login.routes.js'
import { rutaprotegida, routerMiddleware, ruterPerfil } from '../routes/token.routes.js'

export const middleware = Router()

middleware.use(routerMiddleware)
middleware.use(ruterPerfil)
middleware.use('/sucursal', rutaprotegida, routerSucursales)
middleware.use('/', routerRegiste)

middleware.use((req, res) => {
  console.log(req.url)
  return res.render('404page/404')
})

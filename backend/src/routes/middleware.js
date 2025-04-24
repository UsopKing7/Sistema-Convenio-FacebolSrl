import { Router } from 'express'
import { routerSucursales } from '../controllers/sucursales/sucursal.routes.js'
import { routerRegiste } from '../controllers/login/login.routes.js'
import { rutaprotegida, routerMiddleware, ruterPerfil } from '../routes/token.routes.js'
import { routerConvenios } from '../controllers/convenios/convenios.routes.js'

export const middleware = Router()

middleware.use(routerMiddleware)
middleware.use(ruterPerfil)
middleware.use('/sucursal', routerSucursales)
middleware.use('/', routerRegiste)
middleware.use('/convenios', routerConvenios)

middleware.use((req, res) => {
  console.log(req.url)
  return res.json('404page/404')
})

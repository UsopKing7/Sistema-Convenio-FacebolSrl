import { Router } from 'express'
import { routerSucursales } from '../controllers/sucursales/sucursal.routes.js'
import { routerRegiste } from '../controllers/login/login.routes.js'
import { rutaprotegida, routerMiddleware, ruterPerfil } from '../routes/token.routes.js'
import { routerConvenios } from '../controllers/convenios/convenios.routes.js'
import { routerInicio } from '../controllers/dashboard/inicio.routes.js'
import { routerUsuarios } from '../controllers/usuarios/usuarios.routes.js'
import { routerEmpresas } from '../controllers/empresas/empresas.routes.js'
export const middleware = Router()

middleware.use(routerMiddleware)
middleware.use(ruterPerfil)

// rutas publicas
middleware.use('/', routerRegiste)
// rutas privadas
middleware.use('/', rutaprotegida, routerUsuarios)
middleware.use('/', rutaprotegida, routerEmpresas)
middleware.use('/', rutaprotegida, routerSucursales)
middleware.use('/', rutaprotegida, routerConvenios)
middleware.use('/', rutaprotegida, routerInicio)

middleware.use((req, res) => {
  console.log(req.url)
  return res.json({ message: 'Ruta no encontrada' })
})

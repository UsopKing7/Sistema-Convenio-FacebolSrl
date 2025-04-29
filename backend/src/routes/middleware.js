import { Router } from 'express'
import { routerSucursales } from '../controllers/sucursales/sucursal.routes.js'
import { routerRegiste } from '../controllers/login/login.routes.js'
import { rutaprotegida, routerMiddleware, ruterPerfil } from '../routes/token.routes.js'
import { routerConvenios } from '../controllers/convenios/convenios.routes.js'
import { routerInicio } from '../controllers/dashboard/inicio.routes.js'
import { routerUsuarios } from '../controllers/usuarios/usuarios.routes.js'
import { routerTarjetas } from '../controllers/tarjetas/tarketas.routes.js'
export const middleware = Router()

middleware.use(routerMiddleware)
middleware.use(ruterPerfil)

// rutas publicas
middleware.use('/', routerRegiste)
middleware.use('/', routerUsuarios)
middleware.use('/', routerTarjetas)
// rutas privadas
middleware.use('/sucursal', rutaprotegida, routerSucursales)
middleware.use('/convenios', rutaprotegida, routerConvenios)
middleware.use('/', rutaprotegida, routerInicio)

middleware.use((req, res) => {
  console.log(req.url)
  return res.json({ message: 'Ruta no encontrada' })
})

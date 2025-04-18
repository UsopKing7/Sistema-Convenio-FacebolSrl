
import { routerSucursales } from '../controllers/sucursales/sucursal.routes.js'

middleware.use("/sucursal", routerSucursales)


middleware.use((req, res) => {
  console.log(req.url)
  return res.render('404page/404')
})

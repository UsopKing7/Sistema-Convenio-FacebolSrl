import { Router } from 'express'

export const routerDashboard = Router()

routerDashboard.get('/', (req, res) => {
  console.log(req.url)
  const users = [ // Datos falsos de prueba
    { name: 'Juan', email: 'juan@example.com' },
    { name: 'María', email: 'maria@example.com' }
  ]
  res.render('company/dashboard', { users })
})

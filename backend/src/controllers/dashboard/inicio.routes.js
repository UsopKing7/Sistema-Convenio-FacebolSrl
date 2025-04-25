import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerInicio = Router()

routerInicio.get('/', async (req, res) => {
  try {
    const [totalConvenios] = await pool.query(
      'SELECT COUNT(*) AS total FROM convenios'
    )

    if (totalConvenios.length === 0) return res.status(404).json({ message: 'No se encontraron convenios' })

    res.status(200).json({
      message: 'Total de convenios',
      total: totalConvenios
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})

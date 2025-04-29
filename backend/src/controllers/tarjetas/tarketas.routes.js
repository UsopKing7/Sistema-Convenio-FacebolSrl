import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerTarjetas = Router()

routerTarjetas.get('/tarjetas', async (req, res) => {
  try {
    const [existeTarjetas] = await pool.query(
      'SELECT * FROM tarjetas'
    )

    if (existeTarjetas.length === 0) return res.status(404).json({ message: 'No hay tarjetas disponibles' })

    res.status(200).json({
      message: 'Tarjetas',
      data: existeTarjetas
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.erros || error.message || error
    })
  }
})

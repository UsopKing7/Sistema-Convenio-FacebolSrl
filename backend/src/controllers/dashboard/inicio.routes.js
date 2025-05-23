import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerInicio = Router()

routerInicio.get('/inicioConvenios', async (req, res) => {
  try {
    const [totalConvenios] = await pool.query(
      'SELECT COUNT(*) AS total_convenios FROM convenios'
    )

    if (totalConvenios.length === 0) return res.status(404).json({ message: 'No se encontraron convenios' })

    res.status(200).json({
      data: totalConvenios
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})

routerInicio.get('/inicioSucursales', async (req, res) => {
  try {
    const [totalSucursales] = await pool.query(
      'SELECT COUNT(*) AS total_sucursales FROM sucursales'
    )

    if (totalSucursales.length === 0) return res.status(404).json({ message: 'No se econtraron convenios' })

    res.status(200).json({
      data: totalSucursales
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})

routerInicio.get('/inicioUsuarios', async (req, res) => {
  try {
    const [totalUsuarios] = await pool.query(
      'SELECT COUNT(*) AS total_usuarios FROM usuarios'
    )

    if (totalUsuarios.length === 0) return res.status(404).json({ message: 'No se encontraron convenios' })

    res.status(200).json({
      data: totalUsuarios
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})

routerInicio.get('/inicioTarjetas', async (req, res) => {
  try {
    const [totalTarjetas] = await pool.query(
      'SELECT COUNT(*) AS total_tarjetas FROM tarjetas'
    )

    if (totalTarjetas.length === 0) return res.status(404).json({ message: 'No se encontraron tarjetas' })

    res.status(200).json({
      data: totalTarjetas
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})

routerInicio.get('/inicioEmpresas', async (req, res) => {
  try {
    const [totalEmpresas] = await pool.query(
      'SELECT COUNT(*) AS total_empresas FROM empresas'
    )

    if (totalEmpresas.length === 0) return res.status(404).json({ message: 'No se encontraron empresas' })

    res.status(200).json({
      data: totalEmpresas
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})

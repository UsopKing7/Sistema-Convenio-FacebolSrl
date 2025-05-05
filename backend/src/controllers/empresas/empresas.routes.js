import { Router } from 'express'
import { pool } from '../../models/db.js'
import { ShcemaEmpesas } from '../../routes/SchemaSucursal.js'

export const routerEmpresas = Router()

routerEmpresas.get('/empresas', async (req, res) => {
  try {
    const [empresa] = await pool.query('SELECT * FROM empresas')

    if (empresa.length === 0) return res.status(404).json({ meesage: 'No hay empresas registradas' })

    res.status(200).json({
      message: 'Empresas obtenidas correctamente',
      data: empresa
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno del seridor',
      error: error.message || error.errors || error
    })
  }
})

routerEmpresas.post('/empresas', async (req, res) => {
  const vEmpresas = ShcemaEmpesas.parse(req.body)
  try {
    await pool.query(
      'INSERT INTO empresas (nombre_empresa, representante, celular, correo, descripcion, nit) VALUES (?,?,?,?,?,?)',
      [
        vEmpresas.nombre_empresa,
        vEmpresas.representante,
        vEmpresas.celular,
        vEmpresas.correo,
        vEmpresas.descripcion,
        vEmpresas.nit
      ]
    )

    res.status(200).json({
      message: 'Empresa registrada',
      'nombre empresa': vEmpresas.nombre_empresa,
      representante: vEmpresas.representante,
      celular: vEmpresas.celular,
      correo: vEmpresas.correo,
      descripcion: vEmpresas.descripcion,
      nit: vEmpresas.nit
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message || error.errors || error
    })
  }
})

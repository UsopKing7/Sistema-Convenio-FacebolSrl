import { Router } from 'express'
import { pool } from '../../models/db.js'
import {
  ShcemaEmpesas,
  SchemaUpdateEmpresa
} from '../../routes/SchemaSucursal.js'

export const routerEmpresas = Router()

routerEmpresas.get('/empresas', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit

  try {
    const [totalResult] = await pool.query('SELECT COUNT(*) AS total FROM empresas')
    const total = totalResult[0].total
    const totalPages = Math.ceil(total / limit)

    const [empresa] = await pool.query('SELECT * FROM empresas LIMIT ? OFFSET ?', [limit, offset])

    if (empresa.length === 0) return res.status(404).json({ meesage: 'No hay empresas registradas' })

    res.status(200).json({
      message: 'Empresas obtenidas correctamente',
      data: empresa,
      currentPage: page,
      totalPages
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno del seridor',
      error: error.message || error.errors || error
    })
  }
})

routerEmpresas.get('/empresaUnica/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM empresas WHERE id = ?',
      [id]
    )

    if (empresaExiste.length === 0) return res.status(404).json({ message: 'Empresa no encontrada' })

    res.status(200).json(empresaExiste[0])
  } catch (error) {
    return res.status(500).json({
      message: 'error internal en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerEmpresas.post('/empresas', async (req, res) => {
  const vEmpresas = ShcemaEmpesas.parse(req.body)
  try {
    await pool.query(
      'INSERT INTO empresas (nombre_empresa, representante, celular, correo, descripcion, nit, facebook, linkedin, tiktok, longitud, altitud) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [
        vEmpresas.nombre_empresa,
        vEmpresas.representante,
        vEmpresas.celular,
        vEmpresas.correo,
        vEmpresas.descripcion,
        vEmpresas.nit,
        vEmpresas.facebook,
        vEmpresas.linkedin,
        vEmpresas.tiktok,
        vEmpresas.longitud,
        vEmpresas.altitud
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

routerEmpresas.patch('/updateEmpresa/:id', async (req, res) => {
  const { id } = req.params
  try {
    const vEmpresas = SchemaUpdateEmpresa.parse(req.body)

    const [empresaExiste] = await pool.query(
      'SELECT * FROM empresas WHERE id = ?',
      [id]
    )

    if (empresaExiste.length === 0) return res.status(404).json({ message: 'Empresa no encontrada para la actualizacion' })

    await pool.query(
      'UPDATE empresas SET descripcion = ?, facebook = ?, linkedin = ?, tiktok = ? WHERE id = ?',
      [
        vEmpresas.descripcion,
        vEmpresas.facebook,
        vEmpresas.linkedin,
        vEmpresas.tiktok,
        id
      ]
    )

    res.status(200).json({ message: 'empresa actualizada correctamente' })
  } catch (error) {
    return res.status(500).json({
      message: 'error internal en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerEmpresas.delete('/deleteEmpresa/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM empresas WHERE id = ?',
      [id]
    )

    if (empresaExiste.length === 0) return res.status(404).json({ message: 'Empresa no encontrada' })

    await pool.query('DELETE FROM convenios WHERE empresa_id = ?', [id])
    await pool.query('DELETE FROM sucursales WHERE empresa_id = ?', [id])
    await pool.query('DELETE FROM empresas WHERE id = ?', [id])

    res.status(200).json({ message: 'Empresa y datos relacionados eliminados correctamente' })
  } catch (error) {
    return res.status(500).json({
      message: 'Error del servidor',
      error: error.errors || error.message || error
    })
  }
})

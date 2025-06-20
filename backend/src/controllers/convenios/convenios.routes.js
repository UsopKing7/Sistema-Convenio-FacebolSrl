#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { SchemaConvenios, schemaUpdateConvenio } from '../../routes/SchemaConvenios.js'

export const routerConvenios = Router()

routerConvenios.get('/convenios', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit
  try {
    const [totalResult] = await pool.query('SELECT COUNT(*) AS total FROM convenios')
    const total = totalResult[0].total
    const totalPages = Math.ceil(total / limit)
    const [convenios] = await pool.query(`
      SELECT
        c.id AS id,
        c.id AS id_convenio,
        c.estado,
        c.folio,
        c.folio_interno,
        c.modalidad,
        c.presupuesto,
        c.fecha_creacion AS fecha_convenio,
        e.id AS id_empresa,
        e.nombre_empresa
      FROM convenios c
      JOIN empresas e ON c.empresa_id = e.id
      LIMIT ? OFFSET ?
    `, [limit, offset])

    res.status(200).json({
      message: 'Convenios encontrados',
      data: convenios,
      currentPage: page,
      totalPages
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerConvenios.get('/convenio/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [convenio] = await pool.query(
      'SELECT * FROM convenios WHERE id = ?', [id]
    )

    if (convenio.length === 0) return res.status(404).json({ message: 'Convenio no econtrado' })

    res.status(200).json(convenio[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerConvenios.post('/convenios/:id', async (req, res) => {
  const { id } = req.params
  const vConvenios = SchemaConvenios.parse(req.body)
  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM empresas WHERE id = ?',
      [id]
    )

    if (empresaExiste.length === 0) return res.status(404).json({ message: 'Empresa no encontrada' })

    await pool.query(
      'INSERT INTO convenios (estado, folio, folio_interno, modalidad, presupuesto, empresa_id) VALUES (?, ?, ?, ?, ?, ?)',
      [
        vConvenios.estado,
        vConvenios.folio,
        vConvenios.folio_interno,
        vConvenios.modalidad,
        vConvenios.presupuesto,
        id
      ]
    )

    res.status(201).json({
      message: 'Convenio creado',
      data: {
        Estado: vConvenios.estado,
        Folio: vConvenios.folio,
        Folio_interno: vConvenios.folio_interno,
        Modilidad: vConvenios.modalidad,
        Presupuesto: vConvenios.presupuesto
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})

routerConvenios.delete('/deleteConvenios/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [convenio] = await pool.query(
      'SELECT * FROM convenios WHERE id = ?', [id]
    )

    if (convenio.length === 0) return res.status(404).json({ message: 'Convenio no encontrado' })

    await pool.query(
      'DELETE FROM convenios WHERE id = ?', [id]
    )

    res.status(200).json({
      message: 'Convenio eliminado'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerConvenios.patch('/updateConvenios/:id', async (req, res) => {
  const { id } = req.params
  const vConvenios = schemaUpdateConvenio.parse(req.body)
  try {
    const [convenioExiste] = await pool.query(
      'SELECT * FROM convenios WHERE id = ?', [id]
    )

    if (convenioExiste.length === 0) return res.status(404).json({ message: 'Convenio no encontrado' })

    await pool.query(
      'UPDATE convenios SET folio = ?, folio_interno = ?, modalidad = ?, presupuesto = ?, estado = ? WHERE id = ?', [
        vConvenios.folio,
        vConvenios.folio_interno,
        vConvenios.modalidad,
        vConvenios.presupuesto,
        vConvenios.estado,
        id
      ]
    )

    res.status(200).json({
      message: 'Convenio actualizado correctamente'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

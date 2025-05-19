#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { SchemaConvenios } from '../../routes/SchemaConvenios.js'

export const routerConvenios = Router()

routerConvenios.get('/convenios', async (req, res) => {
  try {
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
    `)

    res.status(200).json({
      message: 'Convenios encontrados',
      data: convenios
    })
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

    res.status(200).json({
      message: 'Convenio eliminado',
      data: convenio
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

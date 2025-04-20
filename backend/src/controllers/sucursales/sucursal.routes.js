#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import {
  SchemaLugar,
  SchemaSucursal,
  SchemaSucursalTypes
} from '../../routes/SchemaSucursal.js'

export const routerSucursales = Router()

routerSucursales.post('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const schema = SchemaLugar.parse(req.body)
    const schemaSucursal = SchemaSucursal.parse(req.body)
    const schemaSucursalTypes = SchemaSucursalTypes.parse(req.body)

    const empresaExiste = await pool.query(
      'SELECT * FROM empresas WHERE id = ?',
      [id]
    )

    if (empresaExiste.length === 0) {
      return res.status(404).json({ message: 'La empresa no existe' })
    }

    const [dataLugar] = await pool.query(
      'INSERT INTO lugares (estado, ciudad, departamento) VALUES (?, ?, ?)',
      [
        schema.estado,
        schema.ciudad,
        schema.departamento
      ]
    )

    const idLugar = dataLugar.insertId

    const [dataSucursalTypes] = await pool.query(
      'INSERT INTO tipos_sede (nombre_sede, estado) VALUES (?, ?)',
      [
        schemaSucursalTypes.nombre_sede,
        schemaSucursalTypes.estado
      ]
    )

    const idTipoSede = dataSucursalTypes.insertId

    await pool.query(
      'INSERT INTO sucursales (direccion, horario, lugar_id, empresa_id, tipo_sede_id) VALUES (?,?,?,?,?)',
      [
        schemaSucursal.direccion,
        schemaSucursal.horario,
        idLugar,
        id,
        idTipoSede
      ]
    )

    return res.status(201).json({
      message: 'Sucursal registrado completamente',
      ciudad: schema.ciudad,
      departamento: schema.departamento,
      direccion: schemaSucursal.direccion,
      nombre: schemaSucursalTypes.nombre_sede
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error internal en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerSucursales.get('/:id', async (req, res) => {
  console.log('/sucursales' + req.url)
  const id = req.params.id

  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM sucursales WHERE empresa_id = ?',
      [id]
    )

    if (empresaExiste.length === 0) {
      return res.status(404).json({ message: 'Empresa no encontrada' })
    }

    const [branches] = await pool.query(
      `SELECT 
        bt.nombre_sede,
        p.departamento,
        p.ciudad,
        b.direccion,
        b.horario,
        bt.estado
      FROM sucursales b
      JOIN lugares p ON b.lugar_id = p.id
      JOIN tipos_sede bt ON b.tipo_sede_id = bt.id
      WHERE b.empresa_id = ?`,
      [id]
    )

    return res.status(200).json({
      message: 'Sucursales de la empresa',
      data: branches
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error internal en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerSucursales.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM sucursales WHERE id = ?', [id]
    )

    if (empresaExiste.length === 0) {
      return res.status(404).json({ message: 'Sucursal no encontrada' })
    }

    await pool.query(
      'DELETE FROM sucursales WHERE id = ?', [id]
    )
    res.status(200).json({ message: 'Sucursal eliminada correctamente' })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

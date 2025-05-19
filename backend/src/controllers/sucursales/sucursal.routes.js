#!/usr/bin/env node

import { Router } from 'express'
import { pool } from '../../models/db.js'
import { SchemaLugar, schemaSucursalUpdate } from '../../routes/SchemaSucursal.js'

export const routerSucursales = Router()

routerSucursales.post('/sucursales/:id', async (req, res) => {
  const { id } = req.params
  const schemaSucursales = SchemaLugar.parse(req.body)

  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM empresas WHERE id = ?',
      [id]
    )

    if (empresaExiste.length === 0) {
      return res.status(404).json({ message: 'No existe la empresa' })
    }

    const [lugarExiste] = await pool.query(
      'SELECT id FROM lugares WHERE ciudad = ? AND departamento = ? LIMIT 1',
      [schemaSucursales.ciudad, schemaSucursales.departamento]
    )

    let idLugar
    if (lugarExiste.length > 0) {
      idLugar = lugarExiste[0].id
    } else {
      const [nuevoLugar] = await pool.query(
        'INSERT INTO lugares (estado, ciudad, departamento) VALUES (?, ?, ?)',
        [
          schemaSucursales.estado,
          schemaSucursales.ciudad,
          schemaSucursales.departamento
        ]
      )
      idLugar = nuevoLugar.insertId
    }

    const [tipoSedeExiste] = await pool.query(
      'SELECT id FROM tipos_sede WHERE nombre_sede = ? LIMIT 1',
      [schemaSucursales.nombre_sede]
    )

    let idTipoSede
    if (tipoSedeExiste.length > 0) {
      idTipoSede = tipoSedeExiste[0].id
    } else {
      const [nuevoTipoSede] = await pool.query(
        'INSERT INTO tipos_sede (nombre_sede, estado) VALUES (?, ?)',
        [schemaSucursales.nombre_sede, schemaSucursales.estado]
      )
      idTipoSede = nuevoTipoSede.insertId
    }

    await pool.query(
      'INSERT INTO sucursales (direccion, horario, lugar_id, empresa_id, tipo_sede_id) VALUES (?, ?, ?, ?, ?)',
      [
        schemaSucursales.direccion,
        schemaSucursales.horario,
        idLugar,
        id,
        idTipoSede
      ]
    )

    res.status(200).json({
      message: 'Sucursal registrada correctamente',
      ciudad: schemaSucursales.ciudad,
      departamento: schemaSucursales.departamento,
      direccion: schemaSucursales.direccion,
      horario: schemaSucursales.horario,
      nombreSede: schemaSucursales.nombre_sede
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.message || error.errors || error
    })
  }
})

routerSucursales.get('/sucursales', async (req, res) => {
  try {
    const [branches] = await pool.query(
      `SELECT 
        b.id AS id,
        e.nombre_empresa,
        bt.nombre_sede,
        p.departamento,
        p.ciudad,
        b.direccion,
        b.horario,
        bt.estado
      FROM sucursales b
      JOIN empresas e ON b.empresa_id = e.id
      JOIN lugares p ON b.lugar_id = p.id
      JOIN tipos_sede bt ON b.tipo_sede_id = bt.id`
    )

    if (branches.length === 0) {
      return res.status(404).json({ message: 'No hay sucursales registradas' })
    }

    return res.status(200).json({
      message: 'Listado de todas las sucursales',
      data: branches
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerSucursales.get('/sucursal/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [sucursal] = await pool.query(
      `SELECT 
        b.id AS id,
        e.nombre_empresa,
        bt.nombre_sede,
        p.departamento,
        p.ciudad,
        b.direccion,
        b.horario,
        bt.estado
      FROM sucursales b
      JOIN empresas e ON b.empresa_id = e.id
      JOIN lugares p ON b.lugar_id = p.id
      JOIN tipos_sede bt ON b.tipo_sede_id = bt.id
      WHERE b.id = ?`,
      [id]
    )

    if (sucursal.length === 0) {
      return res.status(404).json({ message: 'Sucursal no encontrada' })
    }

    res.status(200).json(sucursal[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerSucursales.patch('/updateSucursales/:id', async (req, res) => {
  const { id } = req.params
  const schemaSucursales = schemaSucursalUpdate.parse(req.body)

  try {
    const [sucursalExiste] = await pool.query(
      'SELECT * FROM sucursales WHERE id = ?',
      [id]
    )

    if (sucursalExiste.length === 0) {
      return res.status(404).json({ message: 'No existe la sucursal' })
    }

    const [lugarExiste] = await pool.query(
      'SELECT id FROM lugares WHERE ciudad = ? AND departamento = ?',
      [schemaSucursales.ciudad, schemaSucursales.departamento]
    )

    let idLugar
    if (lugarExiste.length > 0) {
      idLugar = lugarExiste[0].id
    } else {
      const [nuevoLugar] = await pool.query(
        'INSERT INTO lugares (estado, ciudad, departamento) VALUES (?, ?, ?)',
        [
          schemaSucursales.estado,
          schemaSucursales.ciudad,
          schemaSucursales.departamento
        ]
      )
      idLugar = nuevoLugar.insertId
    }

    const [tipoSedeExiste] = await pool.query(
      'SELECT id FROM tipos_sede WHERE nombre_sede = ? LIMIT 1',
      [schemaSucursales.nombre_sede]
    )

    let idTipoSede
    if (tipoSedeExiste.length > 0) {
      idTipoSede = tipoSedeExiste[0].id
    } else {
      const [nuevoTipoSede] = await pool.query(
        'INSERT INTO tipos_sede (nombre_sede, estado) VALUES (?, ?)',
        [schemaSucursales.nombre_sede, schemaSucursales.estado]
      )
      idTipoSede = nuevoTipoSede.insertId
    }

    await pool.query(
      'UPDATE sucursales SET direccion = ?, horario = ?, lugar_id = ?, tipo_sede_id = ? WHERE id = ?',
      [
        schemaSucursales.direccion,
        schemaSucursales.horario,
        idLugar,
        idTipoSede,
        id
      ]
    )

    res.status(200).json({
      message: 'Sucursal actualizada correctamente',
      ciudad: schemaSucursales.ciudad,
      departamento: schemaSucursales.departamento,
      direccion: schemaSucursales.direccion,
      horario: schemaSucursales.horario,
      nombreSede: schemaSucursales.nombre_sede
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar la sucursal',
      error: error.message || error.errors || error
    })
  }
})

routerSucursales.delete('/sucursales/:id', async (req, res) => {
  const id = req.params.id

  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM sucursales WHERE id = ?',
      [id]
    )

    if (empresaExiste.length === 0) {
      return res.status(404).json({ message: 'Sucursal no encontrada' })
    }

    await pool.query('DELETE FROM sucursales WHERE id = ?', [id])
    res.status(200).json({ message: 'Sucursal eliminada correctamente' })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

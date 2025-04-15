#!/usr/bin/env node

import { Router } from "express"
import { pool } from "../../models/db.js"
import {
  SchemaLugar,
  SchemaSucursal,
  SchemaSucursalTypes,
} from "./SchemaSucursal.js"

export const routerSucursales = Router()

routerSucursales.post("/:id", async (req, res) => {
  const id = req.params.id

  try {
    const schema = SchemaLugar.parse(req.body)
    const schemaSucursal = SchemaSucursal.parse(req.body)
    const schemaSucursalTypes = SchemaSucursalTypes.parse(req.body)

    const empresaExiste = await pool.query(
      "SELECT * FROM companies WHERE id = ?",
      [id]
    )

    if (empresaExiste.length === 0) {
      return res.status(404).json({ message: "La empresa no existe" })
    }

    const [dataLugar] = await pool.query(
      "INSERT INTO places (estado, ciudad, departamento) VALUES (?, ?, ?)",
      [
        schema.estado,
        schema.ciudad,
        schema.departamento
      ]
    )

    const id_lugar = dataLugar.insertId

    const [dataSucursalTypes] = await pool.query(
      "INSERT INTO branch_types (nombre_sede, estado) VALUES (?, ?)",
      [
        schemaSucursalTypes.nombre_sede,
        schemaSucursalTypes.estado
      ]
    )

    const id_tipo_sede = dataSucursalTypes.insertId

    const [dataSucursal] = await pool.query(
      "INSERT INTO branches (direccion, horario, id_lugar, id_empresa, id_tipo_sede) VALUES (?, ?, ?, ?, ?)",
      [
        schemaSucursal.direccion,
        schemaSucursal.horario,
        id_lugar,
        id,
        id_tipo_sede,
      ]
    )

    return res.status(201).json({
      message: "Sucursal registrado completamente",
      ciudad: schema.ciudad,
      departamento: schema.departamento,
      direccion: schemaSucursal.direccion,
      nombre: schemaSucursalTypes.nombre_sede,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error internal en el servidor",
      error: error.errors || error.message || error,
    })
  }
})


routerSucursales.get('/:id', async (req, res) => {
  console.log('/sucursales' + req.url)
  const id = req.params.id

  try {
    const [empresaExiste] = await pool.query(
      'SELECT * FROM branches WHERE id_empresa = ?', [id] 
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
      FROM branches b
      JOIN places p ON b.id_lugar = p.id
      JOIN branch_types bt ON b.id_tipo_sede = bt.id
      WHERE b.id_empresa = ?`, [id]
    )

    return res.status(200).json({
      message: 'Sucursales de la empresa',
      data: branches
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error internal en el servidor",
      error: error.errors || error.message || error
    })
  }
})

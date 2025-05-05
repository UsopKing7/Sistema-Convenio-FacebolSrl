#!/usr/bin/env node

import z from 'zod'

export const SchemaLugar = z.object({
  estado: z.boolean().default(true),
  ciudad: z.string(),
  departamento: z.string()
})

export const SchemaSucursal = z.object({
  direccion: z.string(),
  horario: z.string()

})

export const SchemaSucursalTypes = z.object({
  nombre_sede: z.string(),
  estado: z.boolean().default(true)
})

export const ShcemaEmpesas = z.object({
  nombre_empresa: z.string(),
  representante: z.string(),
  celular: z.string(),
  correo: z.string().email(),
  descripcion: z.string(),
  nit: z.string()
})

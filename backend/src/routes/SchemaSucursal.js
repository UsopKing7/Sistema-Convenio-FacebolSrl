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
  nit: z.string(),
  facebook: z.string().nullable(),
  linkedin: z.string().nullable(),
  tiktok: z.string().nullable(),
  longitud: z.string(),
  altitud: z.string()
})

export const SchemaUpdateEmpresa = z.object({
  descripcion: z.string().optional(),
  facebook: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  tiktok: z.string().nullable().optional()
})

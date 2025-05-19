#!/usr/bin/env node

import z from 'zod'

export const SchemaLugar = z.object({
  estado: z.string(),
  ciudad: z.string(),
  departamento: z.string(),
  direccion: z.string(),
  horario: z.string(),
  nombre_sede: z.string()
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

export const schemaSucursalUpdate = z.object({
  nombre_sede: z.string().optional(),
  ciudad: z.string().optional(),
  departamento: z.string().optional(),
  direccion: z.string().optional(),
  horario: z.string().optional(),
  estado: z.string().optional()
})

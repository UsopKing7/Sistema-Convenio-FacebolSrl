#!/usr/bin/env node

import z, { string } from 'zod'

export const schemaRegister = z.object({
  nombre_empresa: z.string(),
  representante: string(),
  celular: z.string().min(12).max(20),
  correo: z.string().email(),
  descripcion: z.string(),
  nit: z.string(),
  contrasena: z.string().min(8)
})

export const schemaLogin = z.object({
  correo: z.string().email(),
  contrasena: z.string().min(8)
})

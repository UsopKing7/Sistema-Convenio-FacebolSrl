#!/usr/bin/env node

import z from 'zod'

export const schemaRegister = z.object({
  nombre: z.string().min(3),
  correo: z.string().email(),
  telefono: z.string().min(8).max(15),
  contrasena: z.string().min(8),
  nombre_rol: z.string(),
  descripcion_rol: z.string(),
  nombre_permiso: z.string().min(3)
})

export const schemaLogin = z.object({
  correo: z.string().email(),
  contrasena: z.string().min(8)
})

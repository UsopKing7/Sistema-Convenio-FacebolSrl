#!/usr/bin/env node
import z from 'zod'

export const validacion = z.object({
  nombre: z.string().min(3, 'el nombre tiene que tener minimo 3 caracteres'),
  gmail: z.string().email('correo no valido'),
  phone: z.string().min(8, 'Telefeno no valido'),
  direccion: z.string().min(5, 'dirrecion muy corta'),
  passwd: z.string().min(6, 'contraseña muy corta'),
  estado: z.enum(['activo', 'inactivo']).default('activo')
})
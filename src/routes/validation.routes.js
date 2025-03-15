#!/usr/bin/env node
import z from 'zod'

export const validation = z.object({
  name: z.string().min(3, 'el nombre tiene que tener minimo 3 caracteres'),
  email: z.string().email('correo no valido'),
  phone: z.string().min(8, 'Telefeno no valido'),
  address: z.string().min(5, 'dirrecion muy corta'),
  password: z.string().min(8, 'contraseña muy corta'),
  state: z.boolean().default(true, 'se requiere estado booleano')
})
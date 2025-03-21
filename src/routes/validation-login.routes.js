#!/usr/bin/env node

import z from 'zod'

export const validationLogin = z.object({
  email: z.string().email('no es un correo electronico valido'),
  password: z.string().min(8, 'the password tiene que ser mas de 8 caracteres')
})

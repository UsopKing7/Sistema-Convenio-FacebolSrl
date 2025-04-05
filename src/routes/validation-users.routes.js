import z from 'zod'

export const validation = z.object({
  companies_id: z.number().positive().int(),
  name: z.string().min(3, 'el nombre es muy corto'),
  email: z.string().email(),
  password: z.string().min(8, 'la contraseña tiene que tener mas de 7 caracteres'),
  rol: z.string().min(5)
})

export const validationPatchUsers = z.object({
  password: z.string().min(8, 'la contraseña tiene que tener mas de 7 caracteres').optional(),
  rol: z.string().min(5).optional()
})

import z from 'zod'

export const validacionUpdateUsuario = z.object({
  telefono: z.string(),
  contrasena: z.string(),
  nombre_rol: z.string(),
  descripcion_rol: z.string(),
  nombre_permiso: z.string()
})

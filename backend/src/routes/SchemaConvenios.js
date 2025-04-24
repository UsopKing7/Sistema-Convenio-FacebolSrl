import z from 'zod'

export const SchemaConvenios = z.object({
  estado: z.string().default('activo'),
  folio: z.string(),
  folio_interno: z.string(),
  modalidad: z.string(),
  presupuesto: z.number().int().positive()
})

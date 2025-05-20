import z from 'zod'

export const SchemaConvenios = z.object({
  estado: z.number(),
  folio: z.string(),
  folio_interno: z.string(),
  modalidad: z.string(),
  presupuesto: z.number().positive()
})

export const schemaUpdateConvenio = z.object({
  folio: z.string().optional(),
  folio_interno: z.string().optional(),
  modalidad: z.string().optional(),
  presupuesto: z.number().positive().optional(),
  estado: z.number().optional()
})

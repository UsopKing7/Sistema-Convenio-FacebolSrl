#!/usr/bin/env node

import z from 'zod'

export const validationMovements = z.object({
  companies_id: z.number().int().positive(),
  movement_type: z.string(),
  amount: z.number().int().positive(),
  description: z.string()
})

export const validationMovementsPatch = z.object({
  companies_id: z.number().int().optional(),
  movement_type: z.string().optional(),
  amount: z.number().int().optional(),
  description: z.string().optional()
})

export const validationMovementsDelete = z.object({
  id: z.number().int().positive()
})
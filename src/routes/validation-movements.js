#!/usr/bin/env node

import z from 'zod'

export const validationMovements = z.object({
  companies_id: z.number().int().positive(),
  movement_type: z.string(),
  amount: z.number().int(),
  description: z.string()
})

export const validationMovementsPatch = z.object({
  id: z.number().int().positive(),
  companies_id: z.number().int().positive(),
  movement_type: z.string(),
  amount: z.number().int(),
  description: z.string()
})

export const validationMovementsDelete = z.object({
  id: z.number().int().positive()
})
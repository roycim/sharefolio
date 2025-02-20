// /utils/validate.js
import { z } from 'zod'

export const positionSchema = z.object({
  ticker: z.string().min(1),
  quantity: z.number().positive(),
  priceUsd: z.number().nonnegative().optional(),
  tokname: z.string().optional(),
  slug: z.string().optional(),
  // You can add additional optional fields here.
})

export const portfolioSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  creator: z.string().min(1),
  owner: z.string().min(1).optional(),
  displaypicture: z.string().optional(),
  visibility: z.enum(['public', 'private']).optional(),
  positions: z.array(positionSchema).optional(),
})

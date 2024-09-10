import z from 'zod'

export const createGoalValidator = z.object({
  title: z.string().min(1),
  desiredWeekFrequency: z.number().int().min(1).max(7),
})

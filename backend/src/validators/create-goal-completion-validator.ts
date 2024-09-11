import z from 'zod'

export const createGoalCompletionValidator = z.object({
  goalId: z.string(),
})

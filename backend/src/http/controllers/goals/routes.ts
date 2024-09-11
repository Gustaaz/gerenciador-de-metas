import type { MyFastifyInstace } from '@/@types/my-fastify'
import { createGoalValidator } from '@/validators/create-goal-validator'
import { createGoal } from './create-goal'
import { getWeekPendingGoal } from './get-week-pending-goal'
import { createGoalCompletion } from './create-goal-completion'
import { createGoalCompletionValidator } from '@/validators/create-goal-completion-validator'

export async function goalsRoutes(fastify: MyFastifyInstace): Promise<void> {
  fastify.post(
    '/goals',
    {
      schema: {
        body: createGoalValidator,
      },
    },
    async (request, reply) =>
      reply.status(201).send(await createGoal(request.body))
  )

  fastify.get('/goals/week-pending', async (_, reply) =>
    reply.status(200).send(await getWeekPendingGoal())
  )

  fastify.post(
    '/goals/complete',
    {
      schema: {
        body: createGoalCompletionValidator,
      },
    },
    async (request, reply) => {
      reply.status(201).send(await createGoalCompletion(request.body))
    }
  )
}

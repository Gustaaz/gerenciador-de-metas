import { createGoal } from '../create-goal'
import type { MyFastifyInstace } from '@/@types/my-fastify'
import { createGoalValidator } from '@/validators/create-goal-validator'

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
}

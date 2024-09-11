import { createGoalValidator } from '@/validators/create-goal-validator'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async fastify => {
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

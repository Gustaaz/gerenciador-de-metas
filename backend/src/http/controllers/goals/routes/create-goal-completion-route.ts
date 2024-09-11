import { createGoalCompletionValidator } from '@/validators/create-goal-completion-validator'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../create-goal-completion'

export const createGoalCompletionRoute: FastifyPluginAsyncZod =
  async fastify => {
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

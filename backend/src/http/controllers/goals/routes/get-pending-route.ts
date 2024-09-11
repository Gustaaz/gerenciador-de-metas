import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoal } from '../get-week-pending-goal'

export const getPendingRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get('/goals/week-pending', async (_, reply) =>
    reply.status(200).send(await getWeekPendingGoal())
  )
}

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get('/goals/week-summary', async (_, reply) =>
    reply.status(200).send(await getWeekSummary())
  )
}

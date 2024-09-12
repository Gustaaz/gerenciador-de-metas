import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getPendingRoute } from './controllers/goals/routes/get-pending-route'
import { createGoalRoute } from './controllers/goals/routes/create-goal-route'
import { createGoalCompletionRoute } from './controllers/goals/routes/create-goal-completion-route'
import { getWeekSummaryRoute } from './controllers/goals/routes/get-week-summary-route'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getPendingRoute)
app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})

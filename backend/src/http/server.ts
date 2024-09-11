import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getPendingRoute } from './controllers/goals/routes/get-pending-route'
import { createGoalRoute } from './controllers/goals/routes/create-goal-route'
import { createGoalCompletionRoute } from './controllers/goals/routes/create-goal-completion-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getPendingRoute)
app.register(createGoalRoute)
app.register(createGoalCompletionRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})

import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { goalsRoutes } from './controllers/goals/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(goalsRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})

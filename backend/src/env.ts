import z from 'zod'

const encSchema = z.object({
  DATABASE_URL: z.string().url(),
})

export const env = encSchema.parse(process.env)

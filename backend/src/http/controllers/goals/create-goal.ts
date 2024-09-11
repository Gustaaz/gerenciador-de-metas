import { db } from '@/db'
import { goals } from '@/db/schema'

type CreateGoalRequest = {
  title: string
  desiredWeekFrequency: number
}

type CreateGoalResponse = {
  id: string
  title: string
  desiredWeekFrequency: number
  createdAt: Date
}

export async function createGoal({
  title,
  desiredWeekFrequency,
}: CreateGoalRequest): Promise<{ goal: CreateGoalResponse }> {
  const result = await db
    .insert(goals)
    .values({ title, desiredWeekFrequency })
    .returning()
  return {
    goal: result[0],
  }
}

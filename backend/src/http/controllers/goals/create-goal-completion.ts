import { db } from '@/db'
import { goalCompletions, goals } from '@/db/schema'
import dayjs from 'dayjs'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

type CreateGoalCompletionRequest = {
  goalId: string
}

type CreateGoalCompletionResponse = {
  goal: {
    id: string
    desiredWeekFrequency: number
    completionCount: number
  }
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest): Promise<CreateGoalCompletionResponse> {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalCompletedCounts = db.$with('goal_completed_count').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completedCount: count(goalCompletions.id).as('completed_count'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const resultGoalCompletion = await db
    .with(goalCompletedCounts)
    .select({
      desiredWeekFrequency: goals.desiredWeekFrequency,
      completionCount:
        sql /*sql*/`COALESCE(${goalCompletedCounts.completedCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goals)
    .leftJoin(goalCompletedCounts, eq(goalCompletedCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)

  const { desiredWeekFrequency, completionCount } = resultGoalCompletion[0]

  if (completionCount >= desiredWeekFrequency) {
    throw new Error('Goal already completed')
  }

  const completionsGoal = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning()

  return {
    goal: {
      id: completionsGoal[0].id,
      desiredWeekFrequency,
      completionCount: completionCount + 1,
    },
  }
}

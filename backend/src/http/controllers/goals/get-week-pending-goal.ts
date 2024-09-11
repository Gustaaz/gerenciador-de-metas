import { db } from '@/db'
import { goalCompletions, goals } from '@/db/schema'
import dayjs from 'dayjs'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

type GetWeekPendingGoalResponse = {
  id: string
  title: string
  desiredWeekFrequency: number
  completionCount: number
}

export async function getWeekPendingGoal(): Promise<
  GetWeekPendingGoalResponse[]
> {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeekFrequency: goals.desiredWeekFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

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
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalCompletedCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeekFrequency: goalsCreatedUpToWeek.desiredWeekFrequency,
      completionCount:
        sql /*sql*/`COALESCE(${goalCompletedCounts.completedCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalCompletedCounts,
      eq(goalsCreatedUpToWeek.id, goalCompletedCounts.goalId)
    )

  return pendingGoals
}

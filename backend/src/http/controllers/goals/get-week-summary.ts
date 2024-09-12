import { db } from '@/db'
import { goalCompletions, goals } from '@/db/schema'
import dayjs from 'dayjs'
import { and, desc, eq, gte, lte, sql } from 'drizzle-orm'

type GoalsPerDay = Record<
  string,
  {
    id: string
    title: string
    createdAt: Date
  }[]
>

export async function getWeekSummary() {
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

  const goalCompletedInWeek = db.$with('goal_completed_in_week').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAtDate: sql /*sql*/`
        DATE(${goalCompletions.createdAt})`.as('completed_at_date'),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  )

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalCompletedInWeek.completedAtDate,
        completions: sql /*sql*/`
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', ${goalCompletedInWeek.id},
                'title', ${goalCompletedInWeek.title},
                'completedAt', ${goalCompletedInWeek.completedAtDate}
              )
            )
          `.as('completions'),
      })
      .from(goalCompletedInWeek)
      .groupBy(goalCompletedInWeek.completedAtDate)
      .orderBy(desc(goalCompletedInWeek.completedAtDate))
  )

  const result = await db
    .with(goalCompletedInWeek, goalsCompletedByWeekDay, goalsCreatedUpToWeek)
    .select({
      completed:
        sql /*sql*/`(SELECT COUNT(*) FROM ${goalCompletedInWeek})`.mapWith(
          Number
        ),
      total:
        sql /*sql*/`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeekFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql<GoalsPerDay> /*sql*/`
          JSON_OBJECT_AGG(
            ${goalsCompletedByWeekDay.completedAtDate},
            ${goalsCompletedByWeekDay.completions}
          )
        `,
    })
    .from(goalsCompletedByWeekDay)
  return {
    weekSummary: result[0],
  }
}

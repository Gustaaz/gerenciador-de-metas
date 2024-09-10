import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const resultGoals = await db
    .insert(goals)
    .values([
      {
        title: 'Aprender React',
        desiredWeekFrequency: 3,
      },
      {
        title: 'Aprender GraphQL',
        desiredWeekFrequency: 2,
      },
      {
        title: 'Aprender Prisma',
        desiredWeekFrequency: 4,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')
  await db.insert(goalCompletions).values([
    {
      goalId: resultGoals[0].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
    {
      goalId: resultGoals[1].id,
      createdAt: startOfWeek.add(2, 'day').toDate(),
    },
  ])
}

seed().finally(() => client.end())

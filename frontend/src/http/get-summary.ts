type GoalsPerDay = Record<
  string,
  {
    id: string
    title: string
    createdAt: Date
  }[]
>

type Summary = {
  completed: number
  total: number
  goalsPerDay: GoalsPerDay
}

export async function gertSummary(): Promise<Summary> {
  const response = await fetch('http://localhost:3333/goals/week-summary')
  const data = await response.json()

  return data.weekSummary
}

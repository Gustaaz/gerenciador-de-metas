type PendingGoals = {
  id: string
  title: string
  desiredWeekFrequency: number
  completionCount: number
}[]

export async function gertPendingGoals(): Promise<PendingGoals> {
  const response = await fetch('http://localhost:3333/goals/week-pending')
  const data = await response.json()

  return data
}

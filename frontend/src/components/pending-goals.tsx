import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery } from '@tanstack/react-query'
import { gertPendingGoals } from '../http/get-pending-goals'

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: gertPendingGoals,
    staleTime: 1000 * 60, // 1 min
  })

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeekFrequency}
        >
          <Plus className="size-4 text-zinc-400" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}

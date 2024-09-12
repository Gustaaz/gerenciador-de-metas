import { Dialog } from './components/ui/dialog'
import { EmptyGoal } from './components/empty-goal'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { useQuery } from '@tanstack/react-query'
import { gertSummary } from './http/get-summary'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: gertSummary,
    staleTime: 1000 * 60, // 1 min
  })

  return (
    <Dialog>
      {(data && data.total > 0 && <Summary />) || <EmptyGoal />}

      <CreateGoal />
    </Dialog>
  )
}

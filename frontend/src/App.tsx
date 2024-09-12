import { Dialog } from './components/ui/dialog'
import { EmptyGoal } from './components/empty-goal'
import { CreateGoal } from './components/create-goal'

export function App() {
  return (
    <Dialog>
      <EmptyGoal />
      <CreateGoal />
    </Dialog>
  )
}

import logo from './assets/logo-in-orbit.svg'
import leftStart from './assets/left-start.svg'
import { Plus, X } from 'lucide-react'
import { Button } from './components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './components/ui/radio-group'
export function App() {
  const options = [
    { value: '1', icon: '🥱' },
    { value: '2', icon: '🙂' },
    { value: '3', icon: '😎' },
    { value: '4', icon: '😜' },
    { value: '5', icon: '🤯' },
    { value: '6', icon: '🔥' },
  ]
  return (
    <Dialog>
      <div className="h-screen flex flex-col justify-center items-center gap-8 ">
        <img src={logo} alt="in.orbit" />
        <img src={leftStart} alt="in.orbit" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora
          mesmo?
        </p>
        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Criar meta</DialogTitle>
              <DialogClose>
                <X className="size-5 text-zinc-600" />
              </DialogClose>
            </div>
            <DialogDescription>
              Adicione atividades que te fazem bem e que você quer continuar
              praticando toda semana.
            </DialogDescription>
          </div>
          <form className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="Praticar, meditar, etc..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Quantas vezes na semana?</Label>
                <RadioGroup>
                  {options.map(option => (
                    <RadioGroupItem key={option.value} value={option.value}>
                      <RadioGroupIndicator />
                      <span>{option.value}x por semana</span>
                      <span>{option.icon}</span>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" className="flex-1" variant="secondary">
                  Fechar
                </Button>
              </DialogClose>
              <Button className="flex-1">Salvar</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

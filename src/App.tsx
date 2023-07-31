import { Button } from './components/ui/button'
import { Header } from './components/ui/header/header.tsx'
import { Typography } from './components/ui/typography'

export function App() {
  return (
    <div>
      <Button variant={'secondary'}>Go home</Button>
      <Typography variant="H1">Maksim</Typography>
      <Header isAuth={true} />
    </div>
  )
}

// export function App() {
//   return <div>Hello</div>
// }

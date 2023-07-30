import { Header } from './components/header/header.tsx'
import { Button } from './components/ui/button'
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

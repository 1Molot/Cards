import { Link } from 'react-router-dom'

import { Button } from './components/ui/button'
import { Typography } from './components/ui/typography'

export function App() {
  return (
    <div>
      <Button as={Link} to={'/home'} variant={'secondary'}>
        Go home
      </Button>
      <Typography variant={'H1'}></Typography>
    </div>
  )
}

// export function App() {
//   return <div>Hello</div>
// }

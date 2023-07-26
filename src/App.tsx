import { Link } from 'react-router-dom'

import { Button } from './components/ui/button'

export function App() {
  return (
    <div>
      <Button as={Link} to={'/home'}>
        Go home
      </Button>
    </div>
  )
}

// export function App() {
//   return <div>Hello</div>
// }

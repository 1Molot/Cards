// export function App() {
//   return (
//     <div>
//       <Button variant={'secondary'}>Go home</Button>
//       <Typography variant="H1">Maksim</Typography>
//       <Header isAuth={true} />
//       {/*<Modal open={true} />*/}
//       {/*<RouterAuth />*/}
//     </div>
//   )
// }

// export function App() {
//   return <div>Hello</div>
// }

// import { Router } from './router.tsx'
//
// export function App() {
//   return <Router />
// }
import { Provider } from 'react-redux'

//import { Router } from './router'
import { Decks } from './pages/desks/desks.tsx'
import { store } from './services/store'

export function App() {
  return (
    <Provider store={store}>
      {/*<Router />*/}
      <Decks />
    </Provider>
  )
}

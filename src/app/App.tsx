import { Provider } from 'react-redux'

//import { Router } from './router'

import { Decks } from '../pages'

import { BaseLayout } from './layouts/base-layout.tsx'
import { store } from './providers/store-provider/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <BaseLayout>
        {/*<Router />*/}
        <Decks />
      </BaseLayout>
    </Provider>
  )
}

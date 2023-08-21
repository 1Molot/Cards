import { Provider } from 'react-redux'

import { Router } from '../pages/routing/routing.tsx'

import { BaseLayout } from './layouts/base-layout.tsx'
import { store } from './providers/store-provider/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Router />
        {/*<SignIn onSubmit={() => {}} />*/}
      </BaseLayout>
    </Provider>
  )
}

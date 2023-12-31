import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './app/styles/index.scss'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './app/App.tsx'
import { store } from './app/providers/store-provider/store.ts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

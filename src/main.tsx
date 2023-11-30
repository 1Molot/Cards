import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './app/styles/index.scss'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { App } from './app/App.tsx'
import { store } from './app/providers/store-provider/store.ts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HashRouter basename={import.meta.env.BASE_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>
)

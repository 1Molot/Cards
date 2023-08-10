import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './app/styles/index.scss'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { App } from './app/App.tsx'
// import { App } from './App.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

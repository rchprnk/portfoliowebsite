import './i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initMouseSpotlight } from './lib/mouseSpotlight'
import App from './App.tsx'

initMouseSpotlight()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

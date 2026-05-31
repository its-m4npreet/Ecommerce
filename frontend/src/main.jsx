import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
// Clear any server-rendered content to ensure client-side rendering
root.innerHTML = ''

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

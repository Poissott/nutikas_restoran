import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import LanguageSelector from './components/LanguageSelector';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <LanguageSelector />
  </StrictMode>,
)

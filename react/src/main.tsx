import './index.css'

import App from './App.tsx'
import { StrictMode } from 'react'
import { ThemeProvider } from '@emotion/react'
import { createRoot } from 'react-dom/client'
import defaultTheme from './themes/defaultTheme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SearchContext } from './context/SearchContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchContext>
      <App />
    </SearchContext>
  </React.StrictMode>,
)

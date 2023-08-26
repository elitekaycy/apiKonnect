import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SearchContext } from './context/SearchContext.tsx'
import './index.css'
import { DataContext } from './context/dataContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchContext>
      <DataContext>
        <App />
      </DataContext>
    </SearchContext>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ContextProvider from './contexts/ContextProvider.jsx'
import routes from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={routes} />
    </ContextProvider>  </React.StrictMode>,
)

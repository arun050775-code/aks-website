import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Portal from './portal/Portal.jsx'

const isPortal = window.location.pathname.startsWith('/portal')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isPortal ? <Portal /> : <App />}
  </React.StrictMode>
)
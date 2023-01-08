import React from 'react'
import AuthContextProvider from './context/authContext'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
    <AuthContextProvider>

      <App />
    </AuthContextProvider>
  </Router>
)

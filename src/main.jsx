import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import store from './store/index';
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)

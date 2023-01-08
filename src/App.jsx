import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Home from './components/Home'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

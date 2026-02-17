import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"
import Login from './assets/pages/login'
import Dashboard from './assets/pages/dashboard'
import Signup from './assets/pages/Signup'

function App() {
  const isAuth = localStorage.getItem("token");

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

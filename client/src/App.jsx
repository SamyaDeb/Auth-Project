import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVarify from './pages/EmailVarify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<EmailVarify/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </div>
  )
}

export default App

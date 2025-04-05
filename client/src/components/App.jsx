// import { useState, useEffect } from 'react'
import '../assets/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import HomePage from '../pages/HomePage';
import supabase from '../utils/supabase'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/homepage/*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App

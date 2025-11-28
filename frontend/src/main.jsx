import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './pages/RootPages'
import RegistrationForm from './pages/registeration'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/Regist" element={<RegistrationForm/> } />
    </Routes>
  </BrowserRouter>
)

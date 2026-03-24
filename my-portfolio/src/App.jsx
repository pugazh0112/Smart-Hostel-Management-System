import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Pages/App.css';


import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Leave from './Pages/Leave';
import Complaint from './Pages/Complaint';
import WardenDashboard from './Pages/WardenDashboard';
import Profile from './Pages/Profile';
import Contact from './Pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path= "/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/leave" element={<Leave/>} />
        <Route path="/complaint" element={<Complaint/>} />
        <Route path="/warden" element={<WardenDashboard/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/contact'element={<Contact/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
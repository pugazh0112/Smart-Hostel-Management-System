import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

function Home() {
  return (
    
    <div className="animate-fade-in">
      <header>
        <h2>🏨 Hostel Management</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      
      <div className="hero">
        <h1>Welcome to Smart Hostel Management System</h1>
        <p style={{color:'rgb(125, 130, 135)'}}>Manage your Hostel Life Online</p>
      
        <Link to="/register">
        
          <button className="hover-btn">Apply For Hostel</button>
        </Link>

        <Link to="/login">
       
          <button className="login hover-btn">Student Login</button>
        </Link>
      
      </div>
    </div>
  );
}

export default Home;
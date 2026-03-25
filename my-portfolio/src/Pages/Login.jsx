import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './App.css'; 

function Login() {
  const navigate = useNavigate(); 

  const [credentials, setCredentials] = useState({
    regNo: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    console.log("Login Details Sending:", credentials);

    try {
      const response = await fetch("https://smart-hostel-management-system-backend-6als.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const data = await response.json(); 
        
        alert("Login Successful! Welcome 🎉");
        
        localStorage.setItem("loggedInUser", data.regNo);
        localStorage.setItem("userRole", data.role); 

        if (data.role === 'warden') {
          navigate('/warden'); 
        } else {
          navigate('/dashboard'); 
        }
      } else {
        alert("Invalid Register Number or Password ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:Check the Backend server");
    }
  };

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

      <h2 style={{ textAlign: "center",color:'black',padding:'25px' }}>Student Login</h2>
      
      
      <div className="form hover-card" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
        <form onSubmit={handleSubmit}>
          
          <label>Register Number</label>
          <input 
            type="text" 
            name="regNo" 
            value={credentials.regNo} 
            onChange={handleChange} 
            placeholder="Enter Register Number" 
            required 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            placeholder="Enter Password" 
            required 
          />
          
          
          <button className="hover-btn" type="submit">Login</button>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
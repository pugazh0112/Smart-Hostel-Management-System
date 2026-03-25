import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    dept: '',
    year: '',
    phone: '',
    parentPhone: '',
    address: '',
    password:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    console.log("Sending:", formData);

    try {
      const response = await fetch("https://smart-hostel-management-system-backend-6als.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert("Application Submitted Successfully ✅");
        console.log("Saved:", result);
        
      
        setFormData({
          name: '', regNo: '', dept: '', year: '', phone: '', parentPhone: '', address: '', password: ''
        });
      } else {
        alert("Oops! Submission Failed ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Backend server-a check pannunga!");
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

      <h2 style={{ textAlign: "center",color:'black',padding:'20px' }}>Student Hostel Registration</h2>

      
      <div className="form hover-card" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
       
        <form onSubmit={handleSubmit}>
          
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required /><br />
          <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} placeholder="Register Number" required /><br />
          <input type="text" name="dept" value={formData.dept} onChange={handleChange} placeholder="Department" required /><br />
          <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required /><br />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required /><br />
          <input type="text" name="parentPhone" value={formData.parentPhone} onChange={handleChange} placeholder="Parent Number" required /><br />
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required></textarea><br />
          <input type='password' name="password" value={formData.password} onChange={handleChange} placeholder='Create a Strong Password' required /><br /> {/* Added required here too */}

        
          <button className="hover-btn" type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
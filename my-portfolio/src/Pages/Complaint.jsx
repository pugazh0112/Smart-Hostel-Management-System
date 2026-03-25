import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

function Complaint() {
  const navigate = useNavigate();
 
  const currentUserRegNo = localStorage.getItem("loggedInUser");

  const [complaintData, setComplaintData] = useState({
    regNo: currentUserRegNo || '', 
    issueType: 'Maintenance',
    description: ''
  });

  const handleChange = (e) => {
    setComplaintData({
      ...complaintData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://smart-hostel-management-system-backend-6als.onrender.com/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData)
      });

      if (response.ok) {
        alert("Complaint Registered Successfully! 🛠️ Warden will check it soon.");
        navigate('/dashboard'); 
      } else {
        alert("Failed to register complaint.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: 'rgb(0,0,255)', color: 'white' }}>
        <h2>🏨 Hostel Management</h2>
        
        <button className="hover-btn" onClick={() => navigate('/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', backgroundColor:'rgb(22, 28, 41)', color: 'white', border: '1px solid white' }}>
          🔙 Back
        </button>
      </header>

     
      <div className="hover-card" style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: "center", marginTop: 0, padding:'15px', color:'rgb(150, 137, 204)' }}>Register a Complaint ⚠️</h2>
        <p style={{ textAlign: "center", color: '#555' }}>Reg No: <strong>{currentUserRegNo}</strong></p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <div>
            <label>Issue Type:</label><br />
            <select name="issueType" value={complaintData.issueType} onChange={handleChange} style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd' }}>
              <option value="Maintenance">Room Maintenance (Fan/Light/Plumbing)</option>
              <option value="Food">Food / Mess Issue</option>
              <option value="WiFi">Wi-Fi / Internet</option>
              <option value="Cleanliness">Cleaning & Hygiene</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Description:</label><br />
            <textarea name="description" value={complaintData.description} onChange={handleChange} placeholder="Explain your issue in detail..." required style={{ width: '95%', padding: '12px', minHeight: '120px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd', resize: 'vertical' }}></textarea>
          </div>

         
          <button className="hover-btn" type="submit" style={{ padding: '14px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' }}>
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default Complaint;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

function Leave() {
  const navigate = useNavigate();

  const [leaveData, setLeaveData] = useState({
    regNo: '',
    leaveType: 'Home', 
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setLeaveData({
      ...leaveData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Applying Leave:", leaveData);

    try {
      const response = await fetch("http://localhost:8080/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(leaveData)
      });

      if (response.ok) {
        alert("Leave Application Submitted Successfully! 📝 Warden will review it.");
        navigate('/dashboard'); 
      } else {
        alert("Failed to apply leave. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Check the Backend server!");
    }
  };

  return (
  
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: 'rgb(0,0,255)', color: 'white' }}>
        <h2>🏨 Hostel Management</h2>
    
        <button className="hover-btn" onClick={() => navigate('/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer', borderRadius: '5px',backgroundColor:'rgb(22, 28, 41)', color: 'white', border: '1px solid white' }}>
          🔙 Back to Dashboard
        </button>
      </header>

      <h2 style={{ textAlign: "center", marginTop: '20px',color:'rgb(150, 137, 204)' }}>Apply For Leave</h2>

    
      <div className="form hover-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px',borderColor:'rgb(226, 235, 194)', backgroundColor: '#fff' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label>Register Number:</label><br />
            <input type="text" name="regNo" value={leaveData.regNo} onChange={handleChange} placeholder="Enter Reg No" required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>

          <div>
            <label>Leave Type:</label><br />
            <select name="leaveType" value={leaveData.leaveType} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <option value="Home">Going Home</option>
              <option value="Sick">Sick Leave</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>From Date:</label><br />
            <input type="date" name="fromDate" value={leaveData.fromDate} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>

          <div>
            <label>To Date:</label><br />
            <input type="date" name="toDate" value={leaveData.toDate} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>

          <div>
            <label>Reason:</label><br />
            <textarea name="reason" value={leaveData.reason} onChange={handleChange} placeholder="Briefly explain your reason" required style={{ width: '100%', padding: '8px', minHeight: '80px', border: '1px solid #ddd', borderRadius: '5px', resize: 'vertical' }}></textarea>
          </div>

         
          <button className="hover-btn" type="submit" style={{ padding: '12px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Submit Application
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Leave;
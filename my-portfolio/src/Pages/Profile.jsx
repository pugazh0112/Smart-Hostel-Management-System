import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const currentUserRegNo = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (currentUserRegNo) {
      fetch(`https://smart-hostel-management-system-backend-6als.onrender.com/profile/${currentUserRegNo}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.error("Error fetching profile:", err));
    } else {
      navigate('/login'); 
    }
  }, [currentUserRegNo, navigate]);

  if (!userData) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading Profile...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      
      <header style={styles.header}>
        <h2 style={{ margin: 0 }}>👤 My Digital Identity</h2>
        
        <button className="hover-btn" onClick={() => navigate('/dashboard')} style={styles.backBtn}>⬅ Back to Dashboard</button>
      </header>

     
      <div className="animate-fade-in" style={styles.cardWrapper}>
        
        <div className="hover-card" style={styles.idCard}>
          
          <div style={styles.cardHeader}>
            <div style={styles.profileAvatar}>
              {userData.name ? userData.name.charAt(0).toUpperCase() : '🎓'} 
            </div>
            <h2 style={{ margin: '10px 0 5px', color: '#fff', letterSpacing: '1px' }}>
              {userData.name || 'Student Name'}
            </h2>
            <p style={{ margin: 0, color: '#a5b4fc', fontSize: '14px' }}>Hostel Resident</p>
          </div>

          <div style={styles.cardBody}>
            <div style={styles.detailRow}>
              <span style={styles.label}>Register Number</span>
              <span style={styles.value}>{userData.regNo}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.label}>Department</span>
              <span style={styles.value}>{userData.dept || 'N/A'}</span>
            </div>

            <div style={styles.detailRow}>
              <span style={styles.label}>Phone Number</span>
              <span style={styles.value}>{userData.phone || 'N/A'}</span>
            </div>

            <div style={{ ...styles.detailRow, backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '8px', border: '1px solid #bbf7d0', marginTop: '15px' }}>
              <span style={{ ...styles.label, color: '#166534' }}>Allotted Room 🛏️</span>
              <span style={{ ...styles.value, color: '#166534', fontSize: '22px' }}>
                {userData.roomNumber !== "Not Assigned" ? userData.roomNumber : "Pending"}
              </span>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}

const styles = {
  pageContainer: { backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'rgb(0,0,255)', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  backBtn: { padding: '8px 15px', backgroundColor: 'rgb(22, 28, 41)', color: 'white', border: '1px solid white', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
  
  cardWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 20px' },
  idCard: { 
    width: '100%', maxWidth: '400px', 
    backgroundColor: '#fff', 
    borderRadius: '20px', 
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
    overflow: 'hidden',
    position: 'relative'
  },
  cardHeader: { 
    backgroundColor: '#312e81', 
    padding: '40px 20px 20px', 
    textAlign: 'center',
    backgroundImage: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)'
  },
  profileAvatar: { 
    width: '90px', height: '90px', 
    backgroundColor: '#fff', 
    borderRadius: '50%', 
    display: 'flex', justifyContent: 'center', alignItems: 'center', 
    fontSize: '40px', fontWeight: 'bold', color: '#4338ca',
    margin: '0 auto 15px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    border: '4px solid #818cf8'
  },
  cardBody: { padding: '30px 25px' },
  detailRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' },
  label: { color: '#64748b', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
  value: { color: '#1e293b', fontSize: '16px', fontWeight: 'bold' }
};

export default Profile;
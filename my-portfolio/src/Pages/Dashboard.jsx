import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; 

function Dashboard() {
  const navigate = useNavigate();
  const [myLeaves, setMyLeaves] = useState([]);
  const [notices, setNotices] = useState([]);
  const [rooms, setRooms] = useState([]);
  
  const currentUserRegNo = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (currentUserRegNo) {
      fetch(`http://localhost:8080/my-leaves/${currentUserRegNo}`)
        .then(res => res.json())
        .then(data => setMyLeaves(data))
        .catch(err => console.error("Error fetching leaves:", err));
    }

    fetch("http://localhost:8080/get-notices") 
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(err => console.error("Notice fetch error:", err));

    fetchRooms();
  }, [currentUserRegNo]);

  const fetchRooms = () => {
    fetch("http://localhost:8080/rooms/all")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error("Room fetch error:", err));
  };

  const handleBookRoom = async (roomNumber) => {
    if (window.confirm(`Are you sure you want to book Room ${roomNumber}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/rooms/book/${roomNumber}/${currentUserRegNo}`, {
          method: 'PUT'
        });
        
        const message = await response.text(); 
        
        if (response.ok) {
          alert("🎉 " + message);
          fetchRooms(); 
        } else {
          alert("❌ " + message); 
        }
      } catch (error) {
        console.error("Booking error:", error);
        alert("Server error. Please check the backend.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); 
    alert("Logged out successfully! 👋");
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
      
      <header style={styles.header}>
        <h2 style={{ margin: 0 }}>🏨 Hostel Management</h2>
        <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>👤 {currentUserRegNo}</span>
          <button className="hover-btn" onClick={handleLogout} style={styles.logoutBtn}>Logout 🔴</button> 
        </nav>
      </header>

     
      <div className="animate-fade-in" style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: '#5c4b99', fontSize: '32px', margin: '0',padding:'10px' }}>Welcome, {currentUserRegNo}! 🎓</h1>
            <p style={{ color: '#666' }}>Student Control Dashboard</p>
        </div>

        <div className="hover-card" style={styles.noticeSection}> 
          <h3 style={{ color: '#800000', marginTop: 0 }}>📢 Announcements</h3>
          <div style={styles.noticeList}>
            {notices.length > 0 ? (
              notices.map((n, index) => (
                <div key={index} style={styles.noticeCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color: '#800000' }}>{n.title}</strong>
                    <small style={{ color: '#999' }}>{new Date(n.createdAt).toLocaleDateString()}</small>
                  </div>
                  <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#444' }}>{n.content}</p>
                </div>
              ))
            ) : <p style={{ color: '#888' }}>No new notices from Warden.</p>}
          </div>
        </div>

        <div className="hover-card" style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}> {/* CSS Class Added */}
          <h3 style={{ color: '#0f172a', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: 0 }}>
            🛏️ Live Room Booking
          </h3>
          <div style={styles.roomGrid}>
            {rooms.length > 0 ? rooms.map((room, index) => {
              const isFull = room.occupiedBeds >= room.capacity;
              const isEmpty = room.occupiedBeds === 0;
              
              const bgColor = isFull ? '#ffebee' : isEmpty ? '#e8f5e9' : '#fff8e1';
              const borderColor = isFull ? '#f44336' : isEmpty ? '#4caf50' : '#ffc107';

              return (
                <div key={index} className="hover-card" style={{ ...styles.roomCard, backgroundColor: bgColor, borderLeft: `5px solid ${borderColor}` }}> {/* CSS Class Added */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: '#333' }}>Rm {room.roomNumber}</h2>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', backgroundColor: borderColor, color: '#fff' }}>
                      {isFull ? 'FULL' : 'AVAILABLE'}
                    </span>
                  </div>
                  <p style={{ margin: '10px 0', fontSize: '15px', color: '#555' }}>
                    Beds Filled: <strong>{room.occupiedBeds} / {room.capacity}</strong>
                  </p>
                  
                  <button 
                    className="hover-btn" 
                    onClick={() => handleBookRoom(room.roomNumber)}
                    disabled={isFull}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: isFull ? 'not-allowed' : 'pointer',
                      backgroundColor: isFull ? '#ccc' : '#0f172a', color: isFull ? '#666' : '#fff', transition: '0.3s'
                    }}
                  >
                    {isFull ? 'No Space 🚫' : 'Book Bed 🛏️'}
                  </button>
                </div>
              );
            }) : <p style={{ color: '#888' }}>No rooms have been setup by the Warden yet.</p>}
          </div>
        </div>

        <div style={styles.cardContainer}>
          <div className="hover-card" style={styles.navCard}> 
            <span style={{ fontSize: '40px' }}>📝</span><h3>Apply Leave</h3>
            <Link to="/leave" style={{ width: '100%' }}><button className="hover-btn" style={{ ...styles.cardBtn, backgroundColor: '#007BFF' }}>Go to Leave</button></Link> {/* CSS Class Added */}
          </div>
          <div className="hover-card" style={styles.navCard}> 
            <span style={{ fontSize: '40px' }}>⚠️</span><h3>Complaints</h3>
            <Link to="/complaint" style={{ width: '100%' }}><button className="hover-btn" style={{ ...styles.cardBtn, backgroundColor: '#ff9800' }}>Register Complaint</button></Link> {/* CSS Class Added */}
          </div>
          <div className="hover-card" style={styles.navCard}> 
            <span style={{ fontSize: '40px' }}>👤</span><h3>My Profile</h3>
            <Link to="/profile" style={{ width: '100%' }}><button className="hover-btn" style={{ ...styles.cardBtn, backgroundColor: '#28a745' }}>View Profile</button></Link> {/* CSS Class Added */}
          </div>
        </div>

        <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '40px 0' }} />

        <div style={styles.historySection}>
          <h3 style={{ marginBottom: '15px' }}>My Leave History 📜</h3>
          <table style={styles.table}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th></tr>
            </thead>
            <tbody>
              {myLeaves.map((leave, index) => (
                <tr key={index} className="hover-row" style={{ borderBottom: '1px solid #eee' }}> 
                  <td>{leave.leaveType}</td><td>{leave.fromDate}</td><td>{leave.toDate}</td><td>{leave.reason}</td>
                  <td style={{ fontWeight: 'bold', color: leave.status === 'Pending' ? 'orange' : leave.status === 'Approved' ? 'green' : 'red' }}>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'rgb(0,0,255)', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  logoutBtn: { background: '#ff4d4d', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  noticeSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '6px solid #800000', marginBottom: '30px' },
  noticeList: { maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  noticeCard: { backgroundColor: '#fffcfc', padding: '15px', borderRadius: '8px', border: '1px solid #f5e6e6' },
  
  roomGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', padding: '10px 0' },
  roomCard: { padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },

  cardContainer: { display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'nowrap' },
  navCard: { flex: '1', backgroundColor: '#fff', padding: '30px 20px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '250px' },
  cardBtn: { width: '100%', padding: '12px', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' },
  historySection: { textAlign: 'left' }
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

function WardenDashboard() {
  const navigate = useNavigate();
  
  const [allLeaves, setAllLeaves] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [notice, setNotice] = useState({ title: '', content: '' });
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomNumber: '', capacity: 4 });

  useEffect(() => {
    fetchLeaves();
    fetchComplaints();
    fetchRooms();
  }, []);

  const fetchLeaves = () => fetch("https://smart-hostel-management-system-backend-6als.onrender.com/leaves/all").then(res => res.json()).then(setAllLeaves);
  const fetchComplaints = () => fetch("https://smart-hostel-management-system-backend-6als.onrender.com/complaints/all").then(res => res.json()).then(setAllComplaints);
  const fetchRooms = () => fetch("https://smart-hostel-management-system-backend-6als.onrender.com/rooms/all").then(res => res.json()).then(setRooms);

  const handlePostNotice = async (e) => {
    e.preventDefault();
    if (!notice.title || !notice.content) return alert("Please fill all fields!");
    const response = await fetch("https://smart-hostel-management-system-backend-6als.onrender.com/add-notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notice)
    });
    if (response.ok) {
      alert("Announcement Broadcasted! 📢");
      setNotice({ title: '', content: '' });
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!newRoom.roomNumber) return alert("Room Number is required!");
    const response = await fetch("https://smart-hostel-management-system-backend-6als.onrender.com/rooms/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newRoom, occupiedBeds: 0 }) 
    });
    if (response.ok) {
      alert("New Room Added! 🏢");
      setNewRoom({ roomNumber: '', capacity: 4 });
      fetchRooms(); 
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const response = await fetch(`https://smart-hostel-management-system-backend-6als.onrender.com/leave/update/${id}?status=${newStatus}`, { method: "PUT" });
    if (response.ok) { alert(`Leave ${newStatus}!`); fetchLeaves(); }
  };

  const handleResolveComplaint = async (id) => {
    const response = await fetch(`https://smart-hostel-management-system-backend-6als.onrender.com/complaint/resolve/${id}`, { method: "PUT" });
    if (response.ok) { alert("Resolved! ✅"); fetchComplaints(); }
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
      
      <header style={styles.header}>
        <h2 style={{ margin: 0 }}>🛡️ Warden Command Center</h2>
     
        <button className="hover-btn" onClick={() => navigate('/login')} style={styles.logoutBtn}>Logout</button>
      </header>

      
      <div className="animate-fade-in" style={styles.mainContainer}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '30px' }}>
          
          
          <div className="hover-card" style={styles.card}>
            <h3 style={{ marginTop: 0, color: '#800000' }}>📢 Broadcast Announcement</h3>
            <div style={styles.formLayout}>
              <input style={styles.input} placeholder="Notice Title..." value={notice.title} onChange={(e) => setNotice({ ...notice, title: e.target.value })} />
              <textarea style={{ ...styles.input, height: '60px', resize: 'none' }} placeholder="Message..." value={notice.content} onChange={(e) => setNotice({ ...notice, content: e.target.value })} />
             
              <button className="hover-btn" onClick={handlePostNotice} style={styles.postBtn}>Post Notice 🚀</button>
            </div>
          </div>

         
          <div className="hover-card" style={styles.card}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>🏢 Add New Room</h3>
            <div style={styles.formLayout}>
              <input style={styles.input} type="text" placeholder="Room Number (e.g. 104)" value={newRoom.roomNumber} onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })} />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label style={{ color: '#555', fontWeight: 'bold' }}>Capacity:</label>
                <input style={{ ...styles.input, width: '60px', marginBottom: 0 }} type="number" min="1" max="10" value={newRoom.capacity} onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })} />
              </div>
              
              <button className="hover-btn" onClick={handleAddRoom} style={{ ...styles.postBtn, backgroundColor: '#0f172a' }}>+ Add Room</button>
            </div>
          </div>

        </div>

        
        <div className="hover-card" style={styles.card}>
          <h3 style={{ color: '#0f172a', borderBottom: '2px solid #0f172a', paddingBottom: '10px', marginTop: 0 }}>🛏️ Live Room Status Grid</h3>
          <div style={styles.roomGrid}>
            {rooms.length > 0 ? rooms.map((room, index) => {
              const isFull = room.occupiedBeds >= room.capacity;
              const isEmpty = room.occupiedBeds === 0;
              const bgColor = isFull ? '#ffebee' : isEmpty ? '#e8f5e9' : '#fff8e1';
              const borderColor = isFull ? '#f44336' : isEmpty ? '#4caf50' : '#ffc107';
              
              return (
                
                <div key={index} className="hover-card" style={{ ...styles.roomCard, backgroundColor: bgColor, borderLeft: `6px solid ${borderColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2 style={{ margin: '0', color: '#333' }}>{room.roomNumber}</h2>
                    <span style={{ fontSize: '24px' }}>{isFull ? '🔴' : isEmpty ? '🟢' : '🟡'}</span>
                  </div>
                  <div style={{ marginTop: '15px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Beds Filled</p>
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px', color: '#222' }}>{room.occupiedBeds} <span style={{ color: '#888', fontSize: '14px' }}>/ {room.capacity}</span></p>
                  </div>
                </div>
              );
            }) : <p style={{ color: '#888' }}>No rooms available. Add a new room above!</p>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginTop: '30px' }}>
        
       
          <div className="hover-card" style={styles.card}>
            <h3 style={{ color: '#800000', borderBottom: '2px solid #800000', paddingBottom: '10px' }}>Leave Requests</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead><tr style={styles.tableHeader}><th>Reg No</th><th>Type</th><th>Dates</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {allLeaves.map((leave, index) => (
                    <tr key={index} className="hover-row" style={styles.tableRow}>
                      <td style={{ fontWeight: 'bold' }}>{leave.regNo}</td><td>{leave.leaveType}</td><td>{leave.fromDate} to {leave.toDate}</td>
                      <td style={{ fontWeight: 'bold', color: leave.status === 'Pending' ? '#f39c12' : leave.status === 'Approved' ? '#27ae60' : '#e74c3c' }}>{leave.status}</td>
                      <td>
                        {leave.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: '5px' }}>
                           
                            <button className="hover-btn" onClick={() => handleStatusUpdate(leave.id, 'Approved')} style={styles.actionBtn}>✅</button>
                            <button className="hover-btn" onClick={() => handleStatusUpdate(leave.id, 'Rejected')} style={{ ...styles.actionBtn, backgroundColor: '#e74c3c' }}>❌</button>
                          </div>
                        ) : <span style={{ color: '#666' }}>Processed</span>}
                      </td>
                    </tr>
                  ))}
                  {allLeaves.length === 0 && <tr><td colSpan="5" style={{ padding: '15px', textAlign: 'center' }}>No leave requests.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hover-card" style={styles.card}>
            <h3 style={{ color: '#d39e00', borderBottom: '2px solid #d39e00', paddingBottom: '10px' }}>Student Complaints ⚠️</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ ...styles.tableHeader, backgroundColor: '#fff3cd' }}>
                    <th>Reg No</th><th>Issue Type</th><th>Description</th><th>Status</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allComplaints.map((complaint, index) => (
                    
                    <tr key={index} className="hover-row" style={styles.tableRow}>
                      <td style={{ fontWeight: 'bold' }}>{complaint.regNo}</td>
                      <td style={{ color: '#d39e00', fontWeight: 'bold' }}>{complaint.issueType}</td>
                      <td>{complaint.description}</td>
                      <td style={{ fontWeight: 'bold', color: complaint.status === 'Open' ? '#e74c3c' : '#27ae60' }}>
                        {complaint.status}
                      </td>
                      <td>
                        {complaint.status === 'Open' ? (
                         
                          <button className="hover-btn" onClick={() => handleResolveComplaint(complaint.id)} style={styles.resolveBtn}>Resolve ✅</button>
                        ) : (
                          <span style={{ color: '#28a745', fontWeight: 'bold' }}>Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {allComplaints.length === 0 && <tr><td colSpan="5" style={{ padding: '15px', textAlign: 'center' }}>No complaints found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#800000', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
  logoutBtn: { padding: '10px 20px', backgroundColor: '#fff', color: '#800000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  mainContainer: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
  card: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' },
  
  formLayout: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
  postBtn: { padding: '12px', backgroundColor: '#800000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
  
  roomGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' },
  roomCard: { padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: '0.3s' },

  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  tableHeader: { backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eee' },
  tableRow: { borderBottom: '1px solid #eee' },
  actionBtn: { padding: '5px 10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  resolveBtn: { padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};

export default WardenDashboard;
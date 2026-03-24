import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; 

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={styles.header}>
        <h2 style={{ margin: 0 }}>🏨 Hostel Management</h2>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/login" style={styles.navLink}>Login</Link>
          <Link to="/register" style={styles.navLink}>Register</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </nav>
      </header>

      <div style={styles.container}>
        <div className="hover-card" style={styles.contactCard}>
          <h2 style={{ color: '#0f172a', borderBottom: '2px solid #312e81', paddingBottom: '10px', marginTop: 0 }}>
            📞 Support Helpdesk
          </h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            System Administration & Technical Support
          </p>

          <div style={styles.infoSection}>
            <div style={styles.infoBox}>
              <span style={{ fontSize: '24px' }}>📧</span>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ display: 'block' }}>Technical Queries</strong>
                <span style={{ color: '#555' }}>admin-support@example.com</span>
              </div>
            </div>

            <div style={styles.infoBox}>
              <span style={{ fontSize: '24px' }}>☎️</span>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ display: 'block' }}>Hostel Helpline</strong>
                <span style={{ color: '#555' }}>+91 00000 00000 (Placeholder)</span>
              </div>
            </div>

            <div style={styles.infoBox}>
              <span style={{ fontSize: '24px' }}>📍</span>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ display: 'block' }}>Office Location</strong>
                <span style={{ color: '#555' }}>Admin Block, Campus Main Road.</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', marginBottom: '20px' }}>
            Note: Official contact details will be updated soon.
          </p>

          <button 
            className="hover-btn" 
            onClick={() => navigate('/')} 
            style={styles.homeBtn}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'rgb(0,0,255)', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  nav: { display: 'flex', gap: '20px' },
  navLink: { color: 'white', textDecoration: 'none', fontWeight: 'bold' },
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 20px' },
  contactCard: { backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', maxWidth: '500px', width: '100%', textAlign: 'center' },
  infoSection: { display: 'flex', flexDirection: 'column', gap: '15px', margin: '20px 0' },
  infoBox: { display: 'flex', gap: '15px', alignItems: 'center', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #edf2f7' },
  homeBtn: { width: '100%', padding: '12px', backgroundColor: '#312e81', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }
};

export default Contact;
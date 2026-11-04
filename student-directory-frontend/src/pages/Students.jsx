import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // Standard sample data list
  const sampleStudents = [
    { _id: '1', name: 'Charlie', email: 'charlie@example.com', course: 'BSIT - 3' },
    { _id: '2', name: 'Alice Smith', email: 'alice@example.com', course: 'BSCS - 2' },
    { _id: '3', name: 'Bob Jones', email: 'bob@example.com', course: 'BSIS - 4' }
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!token) {
          // If no token is found, display sample data as fallback
          setStudents(sampleStudents);
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/api/students', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch students`);
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setStudents(data);
        } else {
          setStudents(sampleStudents);
        }
      } catch (err) {
        setError(err.message);
        // Fallback to sample data so page is never blank
        setStudents(sampleStudents);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Student Directory</h2>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

        {/* Loading / Error Messages */}
        {loading && <p style={styles.message}>Loading student records...</p>}
        {error && <p style={styles.error}>Backend Warning: {error} (Displaying local data)</p>}

        {/* Student Cards List */}
        {!loading && (
          <div style={styles.list}>
            {students.map((student) => (
              <div key={student._id || student.id} style={styles.studentCard}>
                <div style={styles.studentInfo}>
                  <h3 style={styles.studentName}>{student.name}</h3>
                  <p style={styles.studentDetail}>{student.email}</p>
                </div>
                <span style={styles.badge}>{student.course}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0b101d',
    color: '#ffffff',
    padding: '40px 20px',
    boxSizing: 'border-box',
    display: 'block',
  },
  wrapper: {
    maxWidth: '700px',
    margin: '0 auto',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    borderBottom: '1px solid #23304d',
    paddingBottom: '16px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    margin: 0,
    color: '#ffffff',
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
  message: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '16px',
  },
  error: {
    color: '#ffb74d',
    backgroundColor: 'rgba(255, 183, 77, 0.1)',
    padding: '10px 14px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '13px',
    marginBottom: '20px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  studentCard: {
    backgroundColor: '#172033',
    padding: '18px 22px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #23304d',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  studentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  studentName: {
    margin: 0,
    fontSize: '17px',
    color: '#ffffff',
    fontWeight: '600',
  },
  studentDetail: {
    margin: 0,
    fontSize: '13px',
    color: '#94a3b8',
  },
  badge: {
    backgroundColor: '#5243f6',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
};

export default Students;
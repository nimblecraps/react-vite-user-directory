import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch students`);
        }

        const data = await response.json();
        
        if (Array.isArray(data)) {
          setStudents(data);
        } else if (data.students && Array.isArray(data.students)) {
          setStudents(data.students);
        } else {
          setStudents([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStudents();
    } else {
      setLoading(false);
      setError('No authentication token found. Please log in again.');
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="students-container" style={{ padding: '20px', color: '#fff' }}>
      <header className="students-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Student Directory</h2>
        <button 
          onClick={handleLogout} 
          className="logout-btn"
          style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ marginTop: '20px' }}>
          {students.length === 0 ? (
            <p>No student records found in database.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {students.map((student) => (
                <li 
                  key={student._id || student.id} 
                  style={{ 
                    background: '#1e293b', 
                    margin: '8px 0', 
                    padding: '12px 16px', 
                    borderRadius: '6px',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{student.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{student.email}</div>
                  </div>
                  <span style={{ color: '#38bdf8' }}>{student.course || 'N/A'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Students;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0b101d',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    boxSizing: 'border-box',
    margin: 0,
    padding: '20px',
  },
  card: {
    backgroundColor: '#172033',
    padding: '36px 28px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
    width: '100%',
    maxWidth: '360px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '24px',
    fontWeight: '700',
    marginTop: '0',
  },
  error: {
    color: '#ff6b6b',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '13px',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    width: '100%',
  },
  label: {
    color: '#94a3b8',
    fontSize: '13px',
    textAlign: 'center',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #23304d',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#5243f6',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    width: '100%',
  },
  footerText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '13px',
    marginBottom: '0',
  },
  link: {
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Register;
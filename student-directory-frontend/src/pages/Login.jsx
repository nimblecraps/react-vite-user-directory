import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
    setError('');
    setLoading(true);

    try {
      if (!login) {
        throw new Error('AuthContext login function is missing. Check AuthProvider wrapping.');
      }

      await login(email, password);
      navigate('/students');
    } catch (err) {
      console.error('Sign In Error:', err);
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to connect or invalid credentials.';
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Directory</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
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
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>
            Register here
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
    backgroundColor: '#0a0e17',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  card: {
    backgroundColor: '#111827',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #1f2937',
  },
  title: {
    margin: '0 0 8px 0',
    color: '#ffffff',
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: '600',
  },
  subtitle: {
    margin: '0 0 24px 0',
    color: '#9ca3af',
    fontSize: '14px',
    textAlign: 'center',
  },
  errorAlert: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    color: '#f87171',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    color: '#d1d5db',
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #374151',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '10px',
  },
  footerText: {
    marginTop: '24px',
    color: '#9ca3af',
    fontSize: '14px',
    textAlign: 'center',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Login;
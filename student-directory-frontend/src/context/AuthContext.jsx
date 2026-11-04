// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (email, password) => {
    try {
      // Pass clean object and ensure JSON content-type header
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token: newToken } = response.data;
      if (newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        return response.data;
      }
    } catch (error) {
      // Logs exact message returned by Express (e.g. "User not found", "Password required")
      console.error('Backend 400 response:', error.response?.data);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// src/modules/login.js
import React, { useState } from 'react';
import axios from 'axios';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      // Ricarica la home page o reindirizza
      console.log("Succesful login for " + email + " - Token received: " + token);
      setSuccess('Valid login :)');
      setError('');

      axios.defaults.headers.common['Authorization'] = token;
      onLoginSuccess();
      navigate('/homepage');

    } catch (err) {
      setError('Login failed, please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

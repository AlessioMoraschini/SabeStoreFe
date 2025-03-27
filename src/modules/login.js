// src/modules/login.js
import React, { useState } from 'react';
import axios from 'axios';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

import '../styles/login.css';
import logo from '../images/app-logo.jpg';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const token = response.headers['authorization'];
      const status = response.status;

      localStorage.setItem('token', token);
      // Ricarica la home page o reindirizza
      console.log("Succesful login for " + email + " - Token received: " + token);
      setSuccess('Valid login :)');
      setError('');

      axios.defaults.headers.common['Authorization'] = token;
      onLoginSuccess();
      navigate('/homepage');

    } catch (err) {

    let errorStatus = err.response.status || 500;
    if(errorStatus == 412){
        onError("Email not yet verified, please verify it in order to use the application.");
        return;
    }
    onError('Login failed, please try again.');
    }
  };

  function onError(message){
    setError(message);
    console.error(message);
    setSuccess('');
  }

  const handleResendVerificationMail = async (e) => {
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
    <div className="login-container default-background">
      <img src={logo} alt="Login" className="login-image" />
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <button type="submit" className="login-button">Login</button>
        <div>
            <a href={handleResendVerificationMail}>Resend verification mail</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

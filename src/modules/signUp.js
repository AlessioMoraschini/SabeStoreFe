// src/modules/signUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { createUser } from '../api';
import { useNavigate } from 'react-router-dom';

import '../styles/login.css';
import logo from '../images/app-logo.jpg';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(name, surname, email, password);
      const status = response.status;

      // Ricarica la home page o reindirizza
      onSuccess('User created. Please verify the email using the email sent (if not received please double check you spam) :)');
      navigate('/login');

    } catch (err) {
        onError('User creation failed: ' + err);
    }
  };

  function onError(message){
    setError(message);
    console.error(message);
    setSuccess('');
  }
  function onSuccess(message){
    setSuccess(message);
    console.info(message);
    setError('');
  }

  return (
    <div className="login-container default-background">
      <img src={logo} alt="Login" className="login-image" />
      <h1>Register</h1>
        <form onSubmit={createUser} className="register-form">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="0"
              max="150"
            />
          </div>
          <button type="submit">Register</button>
        </form>
    </div>
  );
};

export default SignupPage;

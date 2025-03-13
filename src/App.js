// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './modules/login';
import HomePage from './modules/homepage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
        <div>
          {isAuthenticated ? <HomePage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
        </div>
    </Router>
  );
};

export default App;

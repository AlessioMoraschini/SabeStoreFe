import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './modules/login';
import HomePage from './modules/homepage';
import SignUpPage from './modules/signUp'; // Importa la tua pagina di registrazione

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Route per login */}
        <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        {/* Route per homepage */}
        <Route path="/homepage" element={<HomePage />} />

        {/* Route per sign up */}
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Hub from './components/Hub';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = (username, token) => {
    setUsername(username);
    setToken(token);
    setLoggedIn(true);
  };

  return (
      <Router>
        <Routes>
          <Route
              path="/"
              element={
                loggedIn ? (
                    <Navigate to="/hub" />
                ) : (
                    <div>
                      <Register />
                      <Login onLogin={handleLogin} />
                    </div>
                )
              }
          />
          <Route
              path="/hub"
              element={
                loggedIn ? (
                    <Hub username={username} token={token} />
                ) : (
                    <Navigate to="/" />
                )
              }
          />
        </Routes>
      </Router>
  );
};

export default App;

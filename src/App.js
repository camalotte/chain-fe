import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Hub from './components/Hub';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  return (
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/hub">Hub</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hub" element={<Hub />} />
            {!loggedIn && (
                <>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;

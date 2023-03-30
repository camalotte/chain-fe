import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  return (
      <div>
        {loggedIn ? (
            <div>
              <nav>
                <span>Welcome, {username}!</span>
              </nav>
              <h1>Home Page</h1>
            </div>
        ) : (
            <div>
              <Register />
              <Login onLogin={handleLogin} />
            </div>
        )}
      </div>
  );
};
export default App;

// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import User from './components/User';
//
// const App = () => {
//   return (
//       <Router>
//         <Switch>
//           <Route exact path="/" component={Login} />
//           <Route path="/register" component={Register} />
//           <Route path="/user/:username" component={User} />
//         </Switch>
//       </Router>
//   );
// }
//
// export default App;

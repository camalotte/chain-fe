import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Hub from "./components/Hub";
import AuthPage from "./components/AuthPage";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    const handleLogin = (username, token) => {
        setUsername(username);
        setToken(token);
        setLoggedIn(true);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
    };

    const handleLogout = () => {
        setUsername("");
        setToken("");
        setLoggedIn(false);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        const savedToken = localStorage.getItem("token");
        if (savedUsername && savedToken) {
            setUsername(savedUsername);
            setToken(savedToken);
            setLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() =>
                        loggedIn ? (
                            <Redirect to="/hub" />
                        ) : (
                            <AuthPage onLogin={handleLogin} />
                        )
                    }
                />
                <Route
                    exact
                    path="/hub"
                    render={() =>
                        loggedIn ? (
                            <Hub username={username} token={token} onLogout={handleLogout} />
                        ) : (
                            <Redirect to="/" />
                        )
                    }
                />
            </Switch>
        </Router>
    );
};

export default App;

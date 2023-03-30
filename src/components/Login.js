import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/login", {
                username,
                password,
            });

            if (response.status === 200) {
                alert("Login successful");
                onLogin(response.data.username)
                setUsername("");
                setPassword("");
                // setLoggedIn(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            } else {
                console.error("Error logging in:", error);
                alert("Error logging in");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;

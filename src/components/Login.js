import React, { useState } from 'react';
import axios from 'axios';
import async from "async";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/login', {
            username, password,
        });

        if (response.status === 200) {
            alert('Login successful');
            onLogin(response.data.username);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Invalid credentials');
    }
};

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

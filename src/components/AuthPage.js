import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../styles/hub.css";

const AuthPage = ({ onLogin }) => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="auth-container">
            <div className="auth-form">
                {showLogin ? (
                    <Login onLogin={onLogin} showLogin={showLogin} setShowLogin={setShowLogin} />
                ) : (
                    <Register showLogin={showLogin} setShowLogin={setShowLogin} />
                )}
            </div>
        </div>
    );
};
export default AuthPage;

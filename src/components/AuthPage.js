import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Hub from "./Hub";

const AuthPage = ({ onLogin }) => {
    return (
        <div>
            <Register />
            <Login onLogin={onLogin} />
        </div>
    );
};

export default AuthPage;

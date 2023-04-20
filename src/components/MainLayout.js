import React from "react";
import "../styles/hub.css";
const MainLayout = ({ children, onLogout, loggedInUser }) => {
    return (
        <div>
            <div className="navbar">
                {/*<Link to="/hub">Home</Link>*/}
                <div className="navbar-user">Hi {loggedInUser}</div>
                <button onClick={onLogout}>Logout</button>
            </div>
            {children}
        </div>
    );
};
export default MainLayout;

import React from "react";
import { Link } from "react-router-dom";

const MainLayout = ({ children, onLogout }) => {
    return (
        <div>
            <div className="navbar">
                {/*<Link to="/hub">Home</Link>*/}
                <button onClick={onLogout}>Logout</button>
            </div>
            {children}
        </div>
    );
};
export default MainLayout;

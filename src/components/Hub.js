import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Hub = ({ username, token, onLogout }) => {
    const [hubData, setHubData] = useState(null);
    // console.log("Hub component, username:", username);
    // console.log(`Hub component, username: ${username}`);

    useEffect(() => {
        const fetchData = () => {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // Fetch data from the /hub route
            axios
                .get("http://localhost:5001/hub", { headers })
                .then((response) => {
                    // Process the response data here
                    console.log(response.data);
                    setHubData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching data from protected route:", error);
                });
        };

        fetchData();
    }, [token]);

    // console.log("Rendering Hub component, username:", username); // Added this line
    // console.log("Username prop type:", typeof username);

    return (
        <div>
            <h1>Welcome to your Hub, {username}!</h1>
            {hubData ? (
                <div>
                    {/* Display the hub data */}
                    <p>{hubData.message}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default Hub;

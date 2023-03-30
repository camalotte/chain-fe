import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hub = ({ username, token }) => {
    const [hubData, setHubData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                // Fetch data from the /hub route
                const response = await axios.get("http://localhost:5001/hub", { headers });

                // Process the response data here
                console.log(response.data);
                setHubData(response.data);
            } catch (error) {
                console.error("Error fetching data from protected route:", error);
            }
        };

        fetchData();
    }, [token]);

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

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './hub.css';
import './search.css'
import ChatList from './ChatList';

const SearchInput = ({ searchInput, handleSearchChange, searchResults, handleSelectUser, setSearchResults }) => {
    const searchRef = useRef(null);

    const handleClick = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    });

    return (
        <div className="search-container" ref={searchRef}>
            <input
                type="text"
                className="search-input"
                placeholder="Search users..."
                value={searchInput} // Use value instead of defaultValue
                onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((user) => (
                        <div
                            key={user.username}
                            className="search-result"
                            onClick={() => handleSelectUser(user)}
                        >
                            <div className="search-result-thumbnail"></div>
                            <span>{user.username}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
const Hub = ({ username, token, onLogout }) => {
    const [hubData, setHubData] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios
                .get('http://localhost:5001/hub', { headers })
                .then((response) => {
                    setHubData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data from protected route:', error);
                });
        };
        fetchData();
    }, [token]);

    const handleSearchChange = async (event) => {
        setSearchInput(event.target.value);
        const searchQuery = event.target.value;

        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get('http://localhost:5001/search?query=' + searchQuery, {
                headers,
            });

            setSearchResults(response.data || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    const handleSelectUser = (user) => {
        // Check if the chat with the selected user already exists
        const existingChat = chats.find((chat) => chat.username === user.username);

        if (!existingChat) {
            // If the chat doesn't exist, add it to the top of the chat list
            setChats([{ username: user.username, lastMessage: '' }, ...chats]);
        }

        // Clear search results and input
        setSearchResults([]);
        setSearchInput('');
    };


    return (
        <div className="hub-container">
            <div className="header">
                <h1>Welcome to your Hub, {username}!</h1>
            </div>
            <SearchInput
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                searchResults={searchResults}
                handleSelectUser={handleSelectUser}
                setSearchResults={setSearchResults}
            />
            <div className="main-content">
                <div className="chat-list-container">
                    <ChatList chats={chats} />
                </div>
                <div className="central-area">
                    {/* Reserve this area for future content */}
                </div>
            </div>
        </div>
    );
};
export default Hub;

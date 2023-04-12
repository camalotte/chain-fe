import socket, { connectSocket, disconnectSocket } from "../Socket";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import ChatList from "./ChatList";
import SearchInput from "./SearchInput";
import ChatScreen from "./ChatScreen";
import '../styles/hub.css';

const generateRoomId = (user1, user2) => {
    return [user1, user2].sort().join('_');
};

const Hub = ({ username, token, onLogout }) => {
    const [hubData, setHubData] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [chats, setChats] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (content) => {
        // Here, you'll need to implement the functionality to save the message to the database.
        // Once the message is saved, you can add it to the messages state.
        const newMessage = {
            sender: username,
            content: content,
            timestamp: new Date(),
        };
        // Emit an event to the server with the new message
        socket.emit('send_message', newMessage);
    };
    // Pass the messages state and the handleSendMessage function to the ChatScreen component
    <ChatScreen messages={messages} currentUser={username} onSendMessage={handleSendMessage} />

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await axios.get('http://localhost:5001/hub', { headers });
                setHubData(response.data);

                // Connect the socket after fetching data
                connectSocket(token);
            } catch (error) {
                console.error('Error fetching data from protected route:', error);
            }
        };
        fetchData();

        return () => {
            // Disconnect the socket when the component unmounts
            disconnectSocket();
        };
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
        setSelectedUser(user);
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
    const handleChatSelect = (chat) => {
        setSelectedUser({ username: chat.username });
    };




    return (
        <div className="hub-page">
            <div className="hub-container">
                <div className="search-row">
                    <SearchInput
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        searchResults={searchResults}
                        handleSelectUser={handleSelectUser}
                        setSearchResults={setSearchResults}
                    />
                </div>
                <div className="chat-row">
                    <div className="chat-list-container">
                        <ChatList chats={chats} onChatSelect={handleChatSelect} />
                    </div>
                    <div className="chat-screen-container">
                        {/* Reserve this area for future content */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Hub;

import socket, { connectSocket, disconnectSocket } from "../Socket";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ChatList from "./ChatList";
import SearchInput from "./SearchInput";
import ChatScreen from "./ChatScreen";
import "../styles/hub.css";
import MainLayout from "./MainLayout";

const Hub = ({ username, token }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);


    useEffect(() => {
        if (username && token) {
            connectSocket(username);
        }
        return () => {
            disconnectSocket();
        };
    }, [username, token]);

    const handleSearchChange = async (event) => {
        setSearchInput(event.target.value);
        const searchQuery = event.target.value;

        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get("http://localhost:5001/search?query=" + searchQuery, {
                headers,
            });

            setSearchResults(response.data || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearchResults([]);
        setSearchInput("");
    };

    const handleAddContact = async (contactUsername) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post(
                "http://localhost:5001/add-contact",
                { contactUsername },
                { headers }
            );

            if (response.status === 201) {
                // If the contact is added successfully, update the contacts state
                setContacts((prevChats) => [
                    ...prevChats,
                    { contact_username: contactUsername },
                ]);
            } else {
                console.error("Error adding contact:", response.data.message);
            }
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const fetchContacts = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get("http://localhost:5001/contacts", { headers });

            if (response.status === 200) {
                setContacts(response.data);
            } else {
                console.error("Error fetching contacts:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchContacts();
        }
    }, [token]);

    const fetchChatHistory = async (contactUsername) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `http://localhost:5001/chat-history/${contactUsername}`,
                { headers }
            );
            if (response.status === 200) {
                setChatHistory(response.data);
                setSelectedUser({ username: contactUsername });
                // Log the fetched chat history
                console.log(`fetched msg history with: ${contactUsername}`, response.data);
            } else {
                console.error("Error fetching chat history:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };


    const handleNewMessage = (message) => {
        setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
    };


    console.log('Selected user:', selectedUser);


    return (
        <div className="hub-page">
            {/*<MainLayout*/}
            {/*    // loggedInUser ={username}*/}
            {/*/>*/}
            <div className="hub-container">
                <div className="search-row">
                    <SearchInput
                        searchInput={searchInput}
                        handleSearchChange={handleSearchChange}
                        searchResults={searchResults}
                        handleSelectUser={handleSelectUser}
                        handleAddContact={handleAddContact}
                        setSearchResults={setSearchResults}
                    />
                </div>
                <div className="chat-row">
                    <div className="contact-list-container">
                        <ChatList chats={contacts} onSelectContact={fetchChatHistory} />
                    </div>
                    <div className="chat-screen-container">
                        {selectedUser && (
                            <ChatScreen
                                selectedUser={selectedUser}
                                currentUsername={username}
                                chatHistory={chatHistory}
                                token={token}
                                handleNewMessage={handleNewMessage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};
export default Hub;

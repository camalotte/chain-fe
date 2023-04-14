import { connectSocket, disconnectSocket } from "../Socket";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ChatList from "./ChatList";
import SearchInput from "./SearchInput";
import ChatScreen from "./ChatScreen";
import "../styles/hub.css";

const Hub = ({ username, token, onLogout }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [chats, setChats] = useState([]);

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
                // If the contact is added successfully, update the chats state
                setChats((prevChats) => [
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
                setChats(response.data);
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



    return (
        <div className="hub-page">
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
                        <ChatList chats={chats} />
                    </div>
                    <div className="chat-screen-container">
                        {selectedUser && <ChatScreen />}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Hub;

import React from "react";
import { useState } from "react";
import axios from 'axios';
const ChatScreen = ({ selectedUser, chatHistory, token, currentUsername}) => {
    const [messageContent, setMessageContent] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post(
                `http://localhost:5001/send-message/${selectedUser.username}`,
                { messageContent },
                { headers }
            );

            if (response.status === 201) {
                setMessageContent("");
                // Update chatHistory state with the new message
            } else {
                console.error("Error sending message:", response.data.message);
            }
        } catch (error) {
            console.error("FE2 Error sending message:", error);
        }
    };

    return (
        <div className="chat-screen-container">
            <div className="chat-history">
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${
                            message.sender_username === currentUsername
                                ? "message-sent"
                                : "message-received"
                        }`}
                    >
                        <div className="message-content">{message.content}</div>
                        <div className="message-timestamp">
                            {new Date(message.timestamp).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
export default ChatScreen;

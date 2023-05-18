import React, { useState, useEffect } from "react";
import socket from "../Socket";
import axios from 'axios';
const ChatScreen = ({ selectedUser, chatHistory, token, currentUsername, handleNewMessage }) => {
    const [messageContent, setMessageContent] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.post(
                `http://localhost:5001/send-message/${selectedUser.username}`,
                {messageContent},
                {headers}
            );
            if (response.status === 201) {

                // Add the sent message to the chatHistory state
                handleNewMessage({
                    messageId: response.data.messageId,
                    sender: currentUsername,
                    content: messageContent,
                    timestamp: new Date().toISOString(),
                });
                setMessageContent("");
            } else {
                console.error("Error sending message:", response.data.message);
            }
        } catch (error) {
            console.error("FE2 Error sending message:", error);
        }
    };

    useEffect(() => {
        socket.on("message", handleNewMessage);

        return () => {
            socket.off("message", handleNewMessage);
        };
    }, []);


    return (
        <div className="chat-screen-container">
            <div className="chat-history">
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${
                            message.sent ? "message-sent" : "message-received"
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
}
export default ChatScreen;

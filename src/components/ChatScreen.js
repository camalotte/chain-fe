import React, { useState, useEffect } from "react";
import socket from "./socket";
import "../styles/chat-screen.css";
import Message from "./Message";

const ChatScreen = ({ currentUser, onSendMessage }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("join", currentUser.roomId);
        socket.on("previous_messages", (messages) => {
            setMessages(messages);
        });

        socket.on("message", (message) => {
            console.log("Received message:", message); // Add this line
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off("previous_messages");
            socket.off("message");
        };
    }, [currentUser.roomId]);

    const [messageInput, setMessageInput] = useState("");
    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSendClick = () => {
        onSendMessage(messageInput);
        setMessageInput("");
    };


    return (
        <div className="chat-screen">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <Message
                        key={message.timestamp + "-" + index} // Add a unique key
                        message={message}
                        isCurrentUser={message.sender === currentUser.username}
                    />
                ))}
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    placeholder="Type a message"
                    className="message-input"
                />
                <button onClick={handleSendClick} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};
export default ChatScreen;

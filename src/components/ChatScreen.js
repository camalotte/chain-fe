import React, { useState, useEffect } from "react";
import socket from "./socket";
import '../styles/chat-screen.css';
import Message from './Message';

const ChatScreen = ({ currentUser, onSendMessage }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("join", currentUser.roomId);
        socket.on("previous_messages", (messages) => {
            setMessages(messages);
        });
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off("previous_messages");
            socket.off("message");
        };
    }, [currentUser.roomId]);

    const [messageInput, setMessageInput] = useState('');

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSendClick = () => {
        onSendMessage(messageInput);
        setMessageInput('');
    };

    return (
        <div className="chat-screen">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        message={message}
                        isCurrentUser={message.sender === currentUser}
                    />
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    placeholder="Type a message"
                />
                <button onClick={handleSendClick}>Send</button>
            </div>
        </div>
    );
};
export default ChatScreen;

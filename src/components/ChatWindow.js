import React, { useState, useEffect } from "react";
import socket from "../Socket";
const ChatWindow = ({ roomId }) => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            socket.emit("message", roomId, inputMessage);
            setInputMessage("");
        }
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};
export default ChatWindow;

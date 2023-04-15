import React from "react";

const ChatScreen = ({ chatHistory }) => {
    return (
        <div className="chat-screen-container">
            <div className="chat-screen-content">
                {chatHistory.map((message) => (
                    <div key={message.id} className={`message ${message.sender_username === currentUsername ? "sent" : "received"}`}>
                        <span className="message-sender">{message.sender_username}</span>
                        <span className="message-content">{message.content}</span>
                        <span className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            {/* Add other elements such as input field and send button here */}
        </div>
    );
};
export default ChatScreen;

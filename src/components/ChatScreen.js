import React from "react";
import "../styles/chat-screen.css";

const ChatScreen = () => {
    return (
        <div className="chat-screen">
            <div className="messages-container">
                {/* Messages will be rendered here */}
            </div>
            <div className="message-input-container">
                {/* Message input and send button will be placed here */}
            </div>
        </div>
    );
};
export default ChatScreen;

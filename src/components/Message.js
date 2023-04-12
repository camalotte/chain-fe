import React from 'react';
import '../styles/message.css';
const Message = ({ message, isCurrentUser }) => {
    return (
        <div className={`message${isCurrentUser ? ' current-user' : ''}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">{message.timestamp}</div>
        </div>
    );
};
export default Message;

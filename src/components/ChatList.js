import React from 'react';
import '../styles/chatList.css';
const ChatList = ({ chats, onChatSelect }) => {
    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <div
                    key={chat.username}
                    className="chat-cell"
                    onClick={() => onChatSelect(chat.username)} // Call the onChatSelect function when a chat cell is clicked
                >
                    <div className="chat-cell-thumbnail"></div>
                    <div className="chat-cell-content">
                        <span className="chat-cell-username">{chat.username}</span>
                        <span className="chat-cell-last-message">{chat.lastMessage}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ChatList;

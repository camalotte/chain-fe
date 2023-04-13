import React from 'react';
import '../styles/chatList.css';

const ChatList = ({ chats, onChatSelect }) => {
    const handleChatSelect = (username) => {
        console.log(`Selected chat with user ${username}`);
        onChatSelect(username);
    };

    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <div
                    key={chat.username}
                    className="chat-cell"
                    onClick={() => handleChatSelect(chat.username)}
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

import React from 'react';
import './chatList.css';

const ChatCell = ({ username }) => {
    return (
        <div className="chat-cell">
            <div className="chat-cell-thumbnail"></div>
            <div className="chat-cell-content">
                <div className="chat-cell-username">{username}</div>
                <div className="chat-cell-last-message">Last message goes here</div>
            </div>
        </div>
    );
};

const ChatList = ({ chats }) => {
    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <ChatCell key={chat.username} username={chat.username} />
            ))}
        </div>
    );
};
export default ChatList;

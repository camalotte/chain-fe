import React from 'react';
import '../styles/chatList.css';

const ChatList = ({ chats = [] }) => {
    return (
        <div className="chat-list">
            {chats.map((chat, index) => (
                <ChatListItem key={index} chat={chat} />
            ))}
        </div>
    );
};

export default ChatList;

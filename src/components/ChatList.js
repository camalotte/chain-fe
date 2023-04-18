import React from 'react';
const ChatList = ({ chats, onSelectContact }) => {

    return (
        <>
            {chats.map((chat) => (
                <div
                    key={chat.contact_username}
                    className="contact-cell"
                    onClick={() => onSelectContact(chat.contact_username)}
                >
                    <div className="contact-cell-thumbnail"></div>
                    <span>{chat.contact_username}</span>
                </div>
            ))}
        </>
    );
};
export default ChatList;

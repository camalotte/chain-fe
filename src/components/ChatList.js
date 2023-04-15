import React from 'react';
const ChatList = ({ chats, onSelectContact }) => {
    const handleSelectContact = (contactUsername) => {
        onSelectContact(contactUsername);
    };

    return (
        <>
            {chats.map((chat) => (
                <div
                    key={chat.contact_username}
                    className="contact-cell"
                    onClick={() => handleSelectContact(chat.contact_username)}
                >
                    <div className="contact-cell-thumbnail"></div>
                    <span>{chat.contact_username}</span>
                </div>
            ))}
        </>
    );

};
export default ChatList;

// import React from 'react';
// import '../styles/chatList.css';
//
// const ChatList = ({ chats = [] }) => {
//     return (
//         <div className="chat-list">
//             {chats.map((chat) => (
//                 <ChatListItem key={chat.id} chat={chat} />
//             ))}
//         </div>
//     );
// };
// export default ChatList;

import React from 'react';
import '../styles/chatList.css';
const ChatList = ({ chats }) => {
    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <div key={chat.contact_username} className="chat-item">
                    <div className="chat-item-thumbnail"></div>
                    <span>{chat.contact_username}</span>
                </div>
            ))}
        </div>
    );
};
export default ChatList;


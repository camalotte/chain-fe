import React from 'react';

const ChatList = ({ chats }) => {
    return (
        <>
            {chats.map((chat) => (
                <div key={chat.contact_username} className="contact-cell">
                    <div className="contact-cell-thumbnail"></div>
                    <span>{chat.contact_username}</span>
                </div>
            ))}
        </>
    );

};
export default ChatList;

// import React from "react";
// const ChatList = ({ chats }) => {
//     return (
//         <div className="contact-list">
//             {chats.map((chat, index) => (
//                 <div key={index} className="contact-cell">
//                     <div className="contact-cell-thumbnail"></div>
//                     <div className="contact-cell-content">
//                         <div className="contact-cell-username">{chat.contact_username}</div>
//                         <div className="contact-cell-last-message">
//                             {/* Display last message here */}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default ChatList;

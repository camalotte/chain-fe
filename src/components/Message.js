// import React from 'react';
// import '../styles/message.css';
// const Message = ({ message, isCurrentUser }) => {
//     return (
//         <div className={`message${isCurrentUser ? ' current-user' : ''}`}>
//             <div className="message-content">{message.content}</div>
//             <div className="message-timestamp">{message.timestamp}</div>
//         </div>
//     );
// };
// export default Message;

import React from "react";
import "../styles/message.css";
const Message = ({ message, isCurrentUser }) => {
    return (
        <div
            className={`message ${
                isCurrentUser ? "current-user-message" : "other-user-message"
            }`}
        >
            <div className="message-sender">{message.sender}</div>
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">{message.timestamp}</div>
        </div>
    );
};
export default Message;

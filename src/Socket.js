import { io } from "socket.io-client";

const URL = "http://localhost:5001"; // Replace with your server's URL
const socket = io(URL, { autoConnect: false });
socket.on("connect", () => {
    console.log("Socket connected from Socket.js:", socket.id);
});
export const connectSocket = (token) => {
    if (!socket.connected) {
        socket.auth = { token };
        socket.connect();
    }
};
export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};
export default socket;

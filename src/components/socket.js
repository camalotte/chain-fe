import { io } from "socket.io-client";

const socket = io("http://localhost:5001"); // Replace with the actual server address and port

export default socket;

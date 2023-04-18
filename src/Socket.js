import io from "socket.io-client";

const socket = io("http://localhost:5001", {
    autoConnect: false,
});
export function connectSocket(username) {
    if (!socket.connected) {
        socket.io.opts.query = { username };
        socket.connect();
    }
}
export function disconnectSocket() {
    if (socket.connected) {
        socket.disconnect();
    }
}
export default socket;

import { io } from "socket.io-client";

const URL = "http://localhost:8080";
const Socket = io(URL, { autoConnect: false });

export default Socket;

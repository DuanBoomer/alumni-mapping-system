import { io } from 'socket.io-client';

// const URL = "http://127.0.0.1:8000/"
const URL = "https://ams-chat-api.onrender.com/"

export const socket = io(URL);
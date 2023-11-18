import { io } from 'socket.io-client';

const URL = "https://ams-chat-api.onrender.com/"

export const socket = io(URL);
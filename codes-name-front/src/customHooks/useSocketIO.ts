import { io } from 'socket.io-client';

export const useSocketIO = (socketUrl: string) => {
  console.log(socketUrl);
  const socket = io(`http://localhost:8000`, { path: '/websockets' });
  return { socket };
};

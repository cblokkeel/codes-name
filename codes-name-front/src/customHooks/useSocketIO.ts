import { io } from 'socket.io-client';

export const useSocketIO = (socketUrl: string) => {
  console.log(socketUrl);
  const socket = io(`http://localhost:3000`);
  return { socket };
};

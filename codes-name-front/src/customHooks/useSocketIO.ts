import { io } from 'socket.io-client';

export const useSocketIO = (socketUrl: string, room: string) => {
  console.log(room);
  console.log(socketUrl);
  const socket = io(`http://localhost:8000`, {
    path: '/games',
    transports: ['games', 'websocket'],
  });
  socket.emit('joinRoom', room);
  return { socket };
};

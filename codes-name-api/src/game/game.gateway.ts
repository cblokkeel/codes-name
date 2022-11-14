import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8000, {
  path: '/games',
  serveClient: true,
  namespace: '/',
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('GameGateway');

  /*
   * CONNECTION
   */

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`User connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`User disconected: ${client.id}`);
  }

  /*
   * ROOMS
   */

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    this.logger.log(`User ${client.id} joined ${room} room`);
    client.join(room);
    client.emit('joinRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    this.logger.log(`User ${client.id} left ${room} room`);
    client.leave(room);
    client.emit('leftRoom', room);
  }

  /*
   * TEST
   */

  @SubscribeMessage('message')
  handleTest(
    @MessageBody()
    message: {
      sender: string;
      room: string;
      messageText: string;
    },
  ) {
    const { sender, room, messageText } = message;
    this.logger.log(`${sender} said: ${messageText} in room ${room}`);
    this.server.to(room).emit('messageClient', message);
  }
}

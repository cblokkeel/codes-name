import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('GameGateway');

  /*
   * ROOMS
   */

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  /*
   * TEST
   */

  @SubscribeMessage('message')
  handleTest(
    @MessageBody() message: { sender: string; room; string; message: string },
  ) {
    const { sender, room, message: messageText } = message;
    this.server.to(room).emit('messageClient', message);
  }
}

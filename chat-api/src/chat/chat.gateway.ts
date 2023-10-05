import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from './chat.interface';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
  cors: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private players: { client: Socket; username: string }[] = [];
  private chat: Set<{ sender: string; content: string }> = new Set();
  private connectionLogger = new Logger('connectionLogger');
  private eventLogger = new Logger('eventLogger');

  @SubscribeMessage('user-check')
  handleCheckUser(client: Socket, payload: string): void {
    client.emit('user-exists', {
      username: payload,
      exists:
        payload.length < 3 ||
        this.players.some(({ username }) => username === payload),
    });
  }

  @SubscribeMessage('user-take')
  handleJoin(client: Socket, payload: string): void {
    const index = this.players.findIndex(
      ({ client: _client }) => _client.id === client.id,
    );

    this.players.splice(index, 1, { client, username: payload });
  }

  @SubscribeMessage('chat-message')
  handleMessage(client: Socket, payload: { data: ChatMessage }): void | Error {
    this.eventLogger.log(
      `Client ${client.id} sent: ${JSON.stringify(payload.data)}`,
    );
    this.chat.add(payload.data);
    this.server.emit('chat-message', payload);
  }

  handleConnection(client: Socket): void {
    this.players.push({ client, username: '' });
    this.connectionLogger.log(`client ${client.id} joined`);
    this.chat.forEach((conversa) => {
      client.emit('chat-old', conversa);
    });
  }

  handleDisconnect(client: Socket): void {
    this.players = this.players.filter(
      ({ client: _client }) => _client.id !== client.id,
    );
    this.connectionLogger.log(`client ${client.id} left`);
  }
}

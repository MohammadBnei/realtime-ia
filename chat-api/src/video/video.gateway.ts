import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'video',
  cors: true,
})
export class VideoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    client.emit('me', client.id);
    this.clients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  @SubscribeMessage('call')
  handleCall(client: any, { userToCall, signalData, from, name }: any): void {
    this.clients.get(userToCall).emit('call', {
      signal: signalData,
      from,
      name,
    });
  }

  @SubscribeMessage('answer')
  handleAnswer(client: any, { signal, to }: any): void {
    this.clients.get(to).emit('call-accepted', signal);
  }
}

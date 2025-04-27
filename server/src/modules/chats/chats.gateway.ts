import { Server, Socket } from 'socket.io';
import { Client } from 'socket.io/dist/client';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { UserChatRooms } from './types/chat-room';

@WebSocketGateway({ cors: '*' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly userSocketsMap = new Map<string, Socket>();

  @WebSocketServer()
  private readonly socket: Server;

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.userId as string;

    this.userSocketsMap.set(userId, client);
    console.log(`User ${userId} connected!`);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, userSocket] of this.userSocketsMap.entries()) {
      if (client.id === userSocket.id) {
        this.userSocketsMap.delete(userId);

        console.log(`User ${userId} disconnected!`);

        break;
      }
    }
  }

  emitUpdateChats(chatsByMemberId: UserChatRooms) {
    Object.entries(chatsByMemberId).forEach(([userId, chats]) => {
      const client = this.userSocketsMap.get(userId);

      client?.emit('chats:update', chats);
    });
  }
}

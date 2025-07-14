import { Message } from '@prisma/client';
import { Server, Socket } from 'socket.io';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { instanceToPlain } from 'class-transformer';

import { MessageWithDetailsResponseDto } from './dto/responses';

@WebSocketGateway({ namespace: '/messages' })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly userSocketsMap = new Map<string, Socket>();

  @WebSocketServer()
  private readonly socket: Server;

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.userId as string;

    this.userSocketsMap.set(userId, client);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, userSocket] of this.userSocketsMap.entries()) {
      if (client.id === userSocket.id) {
        this.userSocketsMap.delete(userId);

        break;
      }
    }
  }

  @SubscribeMessage('rooms:join')
  handleJoinChat(client: Socket, chatId: number) {
    client.join(chatId.toString());
  }

  @SubscribeMessage('rooms:leave')
  handleLeaveChat(client: Socket, chatId: number) {
    client.leave(chatId.toString());
  }

  emitUpdateMessages(chatId: number, messages: Message[]) {
    const data = {
      chatId,
      messages: messages.map((m) => instanceToPlain(new MessageWithDetailsResponseDto(m))),
    };

    this.socket.to(chatId.toString()).emit('messages:update', data);
  }

  isUserInChat(userId: number, chatId: number) {
    const client = this.userSocketsMap.get(userId.toString());

    return client ? client.rooms.has(chatId.toString()) : false;
  }
}

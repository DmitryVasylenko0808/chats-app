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

import { MessageEntity } from '../messages/entities/message.entity';
import { ChatResponseDto } from './dto/responses';
import { UserChatRooms } from './types/chat-room';

@WebSocketGateway({ cors: '*' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
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

  @SubscribeMessage('chats:join')
  handleJoinChat(client: Socket, chatId: number) {
    client.join(chatId.toString());
  }

  @SubscribeMessage('chats:leave')
  handleLeaveChat(client: Socket, chatId: number) {
    client.leave(chatId.toString());
  }

  emitUpdateChats(chatsByMemberId: UserChatRooms) {
    Object.entries(chatsByMemberId).forEach(([userId, chats]) => {
      const client = this.userSocketsMap.get(userId);

      client?.emit(
        'chats:update',
        chats.map((c) => instanceToPlain(new ChatResponseDto(c)))
      );
    });
  }

  emitUpdateMessages(chatId: number, messages: Message[]) {
    const data = { chatId, messages: messages.map((m) => instanceToPlain(new MessageEntity(m))) };

    this.socket.to(chatId.toString()).emit('messages:update', data);
  }

  isUserInChat(userId: number, chatId: number) {
    const client = this.userSocketsMap.get(userId.toString());

    return client ? client.rooms.has(chatId.toString()) : false;
  }
}

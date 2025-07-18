import { Notification } from '@prisma/client';
import { Server, Socket } from 'socket.io';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { instanceToPlain } from 'class-transformer';

import { NotificationResponseDto } from './dto/responses';

@WebSocketGateway({ namespace: '/notifications' })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
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

  sendNotification(notification: Notification) {
    const client = this.userSocketsMap.get(notification.userId.toString());

    if (client) {
      this.socket
        .to(client.id)
        .emit('notification:get', instanceToPlain(new NotificationResponseDto(notification)));
    }
  }

  sendNotifications(notifications: Notification[]) {
    notifications.forEach((n) => this.sendNotification(n));
  }
}

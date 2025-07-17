import { Injectable } from '@nestjs/common';

import { ChatPreview, UserChatRooms } from '../types';

@Injectable()
export class ChatsUtils {
  sortChatsByLastMessage(chats: ChatPreview[]) {
    return chats
      .map((c) => ({ id: c.id, members: c.members, lastMessage: c.messages[0] }))
      .sort((a, b) => (a.lastMessage?.createdAt < b.lastMessage?.createdAt ? 1 : -1));
  }

  groupChatsByMember(membersIds: number[], chats: ChatPreview[]): UserChatRooms {
    return membersIds.reduce((acc, currId) => {
      const memberChats = chats.filter((item) => item.members.map((m) => m.id).includes(currId));

      return { ...acc, [currId]: memberChats };
    }, {});
  }
}

import { Injectable } from '@nestjs/common';

import { ChatsRepository } from '../chats-repository';
import { ChatsGateway } from '../chats.gateway';
import { ChatsUtils } from '../providers/chats.utils';
import { RefreshChatMember, RefreshMembersChatParams } from '../types';

@Injectable()
export class ChatsRealtimeService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly chatsGateway: ChatsGateway,
    private readonly chatsUtils: ChatsUtils
  ) {}

  async refreshMembersChats(params: RefreshMembersChatParams) {
    let members: RefreshChatMember[];

    if ('chatId' in params) {
      const chat = await this.chatsRepository.findOneById(params.chatId);
      members = chat.members;
    } else {
      members = params.members;
    }

    const membersIds = members.map((m) => m.id);

    const chats = await this.chatsRepository.findChatsByMemberIds(membersIds);
    const sortedChats = this.chatsUtils.sortChatsByLastMessage(chats);
    const chatsByMemberId = this.chatsUtils.groupChatsByMember(membersIds, sortedChats);

    this.chatsGateway.emitUpdateChats(chatsByMemberId);
  }
}

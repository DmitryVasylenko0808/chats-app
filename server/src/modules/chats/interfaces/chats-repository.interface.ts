import { CreateChatRequestDto } from '../dto/requests';
import { ChatPreview, ChatWithMembers } from '../types';

export interface IChatsRepository {
  findManyByUserId(userId: number): Promise<ChatPreview[]>;
  findOneById(id: number): Promise<ChatWithMembers | null>;
  findExistingChatBetweenUsers(usersIds: number[]): Promise<ChatWithMembers | null>;
  findChatsByMemberIds(membersIds: number[]): Promise<ChatPreview[]>;
  create(data: CreateChatRequestDto): Promise<ChatWithMembers>;
  delete(id: number): Promise<ChatWithMembers>;
}

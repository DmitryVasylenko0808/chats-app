import { createMockMessage } from './message.factory';
import { createMockUser } from './user.factory';

export const createMockChat = (id: number, membersIds: number[], messagesIds?: number[]) => ({
  id,
  members: membersIds.map((memberId) => createMockUser(memberId)),
  messages: messagesIds?.map((messageId) => createMockMessage(messageId, id, membersIds[0])),
});

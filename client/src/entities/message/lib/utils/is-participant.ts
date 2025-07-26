import { Message } from '../../model/message';

export const isParticipant = (currentUserId?: number, senderId?: Message['senderId']) =>
  currentUserId !== senderId;

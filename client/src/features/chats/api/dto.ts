import { Chat, Message } from '@/entities';

export type GetChatDto = Chat;
export type GetChatsDto = Chat[];
export type CreateChatDto = Chat;
export type GetMessagesDto = Message[];
export type SendMessageDto = Message;
export type PinMessageDto = Message;
export type UnpinMessageDto = Message;

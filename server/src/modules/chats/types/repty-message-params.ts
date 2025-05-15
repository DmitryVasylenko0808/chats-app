import { SendMessageDto } from '../../messages/dto/send-message.dto';

export type ReplyMessageParams = {
  replyToId: number;
  chatId: number;
  senderId: number;
  dto: SendMessageDto;
};

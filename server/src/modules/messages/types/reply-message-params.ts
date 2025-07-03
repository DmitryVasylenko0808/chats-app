import { SendMessageRequestDto } from '../dto/requests/send-message.request.dto';

export type ReplyMessageParams = {
  replyToId: number;
  chatId: number;
  senderId: number;
  dto: SendMessageRequestDto;
};

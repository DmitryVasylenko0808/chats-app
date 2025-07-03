import { SendMessageRequestDto } from '../dto/requests/send-message.request.dto';

export type SendMessageParams = {
  chatId: number;
  senderId: number;
  dto: SendMessageRequestDto;
  imageFiles: Express.Multer.File[];
};

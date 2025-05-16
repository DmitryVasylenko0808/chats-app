import { SendMessageDto } from '../dto/send-message.dto';

export type SendMessageParams = {
  chatId: number;
  senderId: number;
  dto: SendMessageDto;
  imageFiles: Express.Multer.File[];
};

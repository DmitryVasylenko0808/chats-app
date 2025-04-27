import { IsInt, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty({ message: 'Chat id is required' })
  @IsInt({ message: 'Invalid chat id' })
  readonly chatId: number;

  @IsNotEmpty({ message: 'Sender id is required' })
  @IsInt({ message: 'Invalid sender id ' })
  readonly senderId: number;

  @IsNotEmpty({ message: 'Text is required' })
  readonly text: string;
}

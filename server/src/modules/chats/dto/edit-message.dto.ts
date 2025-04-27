import { IsInt, IsNotEmpty } from 'class-validator';

export class EditMessageDto {
  @IsNotEmpty({ message: 'Chat id is required' })
  @IsInt({ message: 'Invalid chat id' })
  readonly chatId: number;

  @IsNotEmpty({ message: 'Text is required' })
  readonly text: string;
}

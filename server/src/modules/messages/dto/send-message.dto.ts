import { IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty({ message: 'Text is required' })
  readonly text: string;
}

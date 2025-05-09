import { IsNotEmpty } from 'class-validator';

export class EditMessageDto {
  @IsNotEmpty({ message: 'Text is required' })
  readonly text: string;
}

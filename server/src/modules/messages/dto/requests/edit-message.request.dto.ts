import { IsNotEmpty } from 'class-validator';

export class EditMessageRequestDto {
  @IsNotEmpty({ message: 'Text is required' })
  readonly text: string;
}

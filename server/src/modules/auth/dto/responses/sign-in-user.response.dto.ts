export class SignInResponseDto {
  accessToken: string;

  constructor(partial: Partial<SignInResponseDto>) {
    Object.assign(this, partial);
  }
}

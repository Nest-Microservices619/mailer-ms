import { IsString } from 'class-validator';

export class MailerWelcomeDto {
  @IsString()
  email: string;

  @IsString()
  name:string
}

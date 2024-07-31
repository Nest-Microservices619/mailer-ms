import { IsString } from 'class-validator';

export class MailerDto {
  @IsString()
  email: string;

  @IsString()
  name:string

  @IsString()
  token: string;
}

import { Controller} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailerDto, MailerWelcomeDto } from './dto';


@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('send.set.password')
  sendSetPassword(@Payload() mailerDto: MailerDto) {
    this.mailerService.sendSetPassword(mailerDto);
  }

  @EventPattern('email.confirmation')
  emailConfirmation(@Payload() mailerDto: MailerDto) {
    this.mailerService.emailConfirmation(mailerDto);
  }

  @EventPattern("email.welcome")
  emailWelcome(@Payload() mailerWelcome: MailerWelcomeDto){
    this.mailerService.emailWelcome(mailerWelcome)
  }
    
  
}

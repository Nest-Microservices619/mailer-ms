import { Inject, Injectable, Logger } from '@nestjs/common';

import { envs, NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { MailerService as NodeMailerService } from '@nestjs-modules/mailer'; // Importa correctamente
import { MailerDto, MailerWelcomeDto } from './dto';

@Injectable()
export class MailerService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    private mailerService: NodeMailerService,
  ) {}

  private readonly logger = new Logger('MailerService');

  async sendSetPassword(mailerDto: MailerDto) { //FALTA IMPLEMENTAR FRONT
    const { email, token, name } = mailerDto;
    const confirmation_url = `${envs.FRONT_URL}/auth/set/password?token=${token}`; // FRONT Y LUEGO ME LO VUELVE A PASAR AL BACK

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Establecer contraseña',
      template: './set-password', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: name,
        confirmation_url,
      },
    });
  }

  async sendRecoverPassword(mailerDto: MailerDto) { //FALTA IMPLEMENTAR FRONT
    const { email, token, name } = mailerDto;
    const confirmation_url = `${envs.FRONT_URL}/auth/recover/password?token=${token}`; // FRON Y LUEGO ME LO VUELVE A PASAR AL BACK

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Restablecimientos de contraseña',
      template: './', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: name,
        confirmation_url,
      },
    });
  }

  async emailConfirmation(mailerDto: MailerDto){ //LISTO
    const { email, token, name } = mailerDto;
    const confirmation_url = `${envs.AUTH_MS_URL}/api/auth/email/confirmed?token=${token}`; 
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Confirmacion de Correo',
        template: './email-confirmation', 
        context: {
          name: name,
          confirmation_url,
        },
      });
    } catch (error) {
      console.log(error);
      
    }
   
  }

  async emailWelcome(mailerWelcome: MailerWelcomeDto){ //LISTO
    const { email, name } = mailerWelcome;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Bienvenido',
      template: './email-welcome', 
      context: {
        name: name,
      },
    });
  }

}

import { MailerModule as NodeMailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { NatsModule } from 'src/transports/nast.module';
import { join } from 'path';
import { envs } from 'src/config';

@Module({
  imports:[NatsModule,
    NodeMailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: envs.MAIL_HOST,
          secure: false,
          auth: {
            user: envs.SMTP_USERNAME,
            pass: envs.SMTP_PASSWORD,
          },
        },
        defaults: {
          from: `"Miwo App" <${envs.SMTP_USERNAME}>`,
        },
        template: {
          dir: join(__dirname, '..', '..', 'src', 'mailer',  'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),

  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ReportErrorService {
  private readonly logger = new Logger(ReportErrorService.name);

  async sendEmail(
    subject: string,
    contact:string,
    body: string,
    sender: string,
  ): Promise<void> {

    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      const mailOptions = {
        from: sender,
        to: process.env.EMAIL_USERNAME,
        subject: subject,
        text: `Email: ${contact}\n\nMensagem: ${body}`,
      };
  
      await transporter.sendMail(mailOptions);
      this.logger.log('Email enviado com sucesso!');
    } catch (error) {
      this.logger.error('Erro ao enviar o email:', error);
      throw new Error('Falha ao enviar o email');
    }
  }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ReportErrorService {

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
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      // Aqui você pode lançar uma exceção personalizada ou retornar uma mensagem de erro adequada
      throw new Error('Falha ao enviar o email');
    }
  }

}

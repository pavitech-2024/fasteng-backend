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

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'teixeirahist1988@gmail.com',
        pass: '',
      },
    });

    const mailOptions = {
      from: `${sender}`,
      to: 'seu-email@gmail.com',
      subject: `${subject}`,
      text: `Email: ${contact}\n\nMensagem: ${body}`,
    };

    await transporter.sendMail(mailOptions);

  }

}

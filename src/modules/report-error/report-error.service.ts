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
        user: 'pavitechjbr@gmail.com',
        pass: 'pavitech2021',
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

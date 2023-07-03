import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ReportErrorDto } from './dto/report-error.dto';

@Injectable()
export class ReportErrorService {
  private readonly logger = new Logger(ReportErrorService.name);

  async sendEmail(reportErrorDto: ReportErrorDto): Promise<void> {
    try {
      const { subject, body, sender, contact } = reportErrorDto;

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
      this.logger.error(`error on send e-mail > [error]: ${error}`);
      throw error;
    }
  }
}

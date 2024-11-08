import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ReportErrorDto } from './dto/report-error.dto';
import { reportErrorEmailCss } from './styles/reportError/report-error';

@Injectable()
export class ReportErrorService {
  private readonly logger = new Logger(ReportErrorService.name);

  async sendEmail(reportErrorDto: ReportErrorDto): Promise<void> {
    try {
      const { subject, body, sender, contact } = reportErrorDto;
      const fastengLogoLink = 'https://fasteng-frontend.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogoBlack.52a20123.png&w=750&q=75';
      const reportDate = new Date().toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.MAILER_EMAIL_USERNAME,
          pass: process.env.MAILER_EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: sender,
        to: process.env.MAILER_EMAIL_USERNAME,
        subject: subject,
        text: `Email: ${contact}\n\nNome: ${sender}\n\nMensagem: ${body}`,
        html: `
          <html>
            <head>
              ${reportErrorEmailCss}
            </head>
            <body>
              <div class="container">
                <div class="sub-container">
                  <img src="${fastengLogoLink}" alt="Logotipo da Locale Imóveis" class="logo">
                  <p class="text">
                    Olá equipe de suporte,
                  </p>
                  <p class="text">
                    Um erro foi reportado na aplicação por um usuário. Abaixo estão os detalhes do incidente para que possam investigar e resolver o problema.
                  </p>
                  
                  <div class="two-color-line">
                    <p class="title">Detalhes do Erro:</p>
                  </div>
                  <hr>
                  <p class="text"><strong>Usuário:</strong> ${sender}</p>
                  <p class="text"><strong>Email:</strong> ${contact}</p>
                  <p class="text"><strong>Data do Relatório:</strong> ${reportDate}</p>
                  <p class="text"><strong>Mensagem de Erro:</strong> ${body}</p>
                  
                  <div class="additional-info">
                    <p class="small-text">
                      Observação: Para mais detalhes, consulte os logs da aplicação ou entre em contato com o usuário caso necessário.
                    </p>
                  </div>
                  
                  <hr>
                  <p class="small-text">
                    Obrigado pela atenção e rápida resolução.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      this.logger.log('Email enviado com sucesso!');
    } catch (error) {
      this.logger.error(`error on send e-mail > [error]: ${error}`);
      throw error;
    }
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ReportErrorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportErrorService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const report_error_1 = require("./styles/reportError/report-error");
let ReportErrorService = ReportErrorService_1 = class ReportErrorService {
    constructor() {
        this.logger = new common_1.Logger(ReportErrorService_1.name);
    }
    sendEmail(reportErrorDto) {
        return __awaiter(this, void 0, void 0, function* () {
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
              ${report_error_1.reportErrorEmailCss}
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
                yield transporter.sendMail(mailOptions);
                this.logger.log('Email enviado com sucesso!');
            }
            catch (error) {
                this.logger.error(`error on send e-mail > [error]: ${error}`);
                throw error;
            }
        });
    }
};
ReportErrorService = ReportErrorService_1 = __decorate([
    (0, common_1.Injectable)()
], ReportErrorService);
exports.ReportErrorService = ReportErrorService;
//# sourceMappingURL=report-error.service.js.map
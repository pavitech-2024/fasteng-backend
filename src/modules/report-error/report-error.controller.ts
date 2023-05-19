import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ReportErrorService } from './report-error.service';

@Controller('report-error')
export class ReportErrorController {
  private logger = new Logger(ReportErrorController.name)
  constructor(
    private readonly reportErrorService: ReportErrorService
  ){}

  @Post()
  async sendEmail(
    @Body('subject') subject: string,
    @Body('contact') contact: string,
    @Body('body') body: string,
    @Body('sender') sender: string,
  ) {
    this.logger.log({}, 'start sendEmail')
    await this.reportErrorService.sendEmail(subject, contact, body, sender)
  }
}

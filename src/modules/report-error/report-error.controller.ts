import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ReportErrorService } from './report-error.service';
import { ReportErrorDto } from './dto/report-error.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('report-error')
export class ReportErrorController {
  private logger = new Logger(ReportErrorController.name)

  constructor(private readonly reportErrorService: ReportErrorService){}

  @Post()
  @ApiResponse({ status: 201, description: 'E-mail enviado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao enviar o e-mail' })
  async sendEmail(
    @Body() reportErrorDto: ReportErrorDto,
  ) {
    this.logger.log({}, 'start sendEmail')
    await this.reportErrorService.sendEmail(reportErrorDto)
  }
}

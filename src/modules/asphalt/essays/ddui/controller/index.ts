import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Calc_Ddui_Dto, Calc_Ddui_Out } from "../dto/calc-ddui.dto";
import { DduiInitDto } from "../dto/init-ddui.dto";
import { Response } from 'express';
import { DduiService } from "../service/ddui.service";


@ApiTags('ddui')
@Controller('asphalt/essays/ddui')
export class DduiController {
  private logger = new Logger(DduiController.name);

  constructor(private readonly dduiService: DduiService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio ddui com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio ddui com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio ddui com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio ddui com os dados enviados.' })
  async verifyInitDdui(@Res() response: Response, @Body() body: any) {
    this.logger.log('verify init ddui > [body]');

    const status = await this.dduiService.verifyInitDdui(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio ddui com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio ddui calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio ddui com os dados enviados.' })
  async calculateDdui(@Body() body: any) {
    this.logger.log('calculate ddui > [body]');

    const ddui = await this.dduiService.calculateDdui(body);

    if (ddui.success) this.logger.log('calculate ddui > [success]');
    else this.logger.error('calculate ddui > [error]');

    return ddui;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio ddui no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio ddui salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio ddui no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Ddui_Dto & Calc_Ddui_Out) {
    this.logger.log('save ddui > [body]');

    const ddui = await this.dduiService.saveEssay(body);

    if (ddui.success) this.logger.log('save ddui > [success]');
    else this.logger.error('save ddui > [error]');

    return response.status(200).json(ddui);
  }
}

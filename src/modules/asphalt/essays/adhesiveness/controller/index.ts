import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from 'express';
import { AdhesivenessInitDto } from "../dto/adhesiveness-init.dto";
import { AdhesivenessService } from "../service/adhesiveness.service";
import { Calc_Adhesiveness_Dto, Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";

@ApiTags('adhesiveness')
@Controller('asphalt/essays/adhesiveness')
export class AdhesivenessController {
  private logger = new Logger(AdhesivenessController.name);

  constructor(private readonly adhesivenessService: AdhesivenessService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de adesividade com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de adesividade com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de adesividade com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de adesividade com os dados enviados.' })
  async verifyInitAdhesiveness(@Res() response: Response, @Body() body: AdhesivenessInitDto) {
    this.logger.log('verify init adhesiveness > [body]');

    const status = await this.adhesivenessService.verifyInitAdhesiveness(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados d ensaio de adesividade com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados d ensaio de adesividade calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados d ensaio de adesividade com os dados enviados.' })
  async calculateAdhesiveness(@Body() body: Calc_Adhesiveness_Dto) {
    this.logger.log('calculate adhesiveness > [body]');

    const adhesiveness = await this.adhesivenessService.calculateAdhesiveness(body);

    if (adhesiveness.success) this.logger.log('calculate adhesiveness > [success]');
    else this.logger.error('calculate adhesiveness > [error]');

    return adhesiveness;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados d ensaio de adesividade no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados d ensaio de adesividade salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados d ensaio de adesividade no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Adhesiveness_Dto & Calc_Adhesiveness_Out) {
    this.logger.log('save adhesiveness > [body]');

    const adhesiveness = await this.adhesivenessService.saveEssay(body);

    if (adhesiveness.success) this.logger.log('save adhesiveness > [success]');
    else this.logger.error('save adhesiveness > [error]');

    return response.status(200).json(adhesiveness);
  }
}

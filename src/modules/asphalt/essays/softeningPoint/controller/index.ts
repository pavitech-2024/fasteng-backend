import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";
import { SofteningPointInitDto } from "../dto/init-softeningPoint.dto";
import { Response } from 'express';
import { SofteningPointService } from "../service/softeningPoint.service";

@ApiTags('softeningPoint')
@Controller('asphalt/essays/softeningPoint')
export class SofteningPointController {
  private logger = new Logger(SofteningPointController.name);

  constructor(private readonly softeningPointService: SofteningPointService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de ponto de amolecimento com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de ponto de amolecimento com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de ponto de amolecimento com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de ponto de amolecimento com os dados enviados.' })
  async verifyInitSofteningPoint(@Res() response: Response, @Body() body: SofteningPointInitDto) {
    this.logger.log('verify init softeningPoint > [body]');

    const status = await this.softeningPointService.verifyInitSofteningPoint(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de ponto de amolecimento com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados d ensaio de ponto de amolecimento calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de ponto de amolecimento com os dados enviados.' })
  async calculateSofteningPoint(@Body() body: Calc_SofteningPoint_Dto) {
    this.logger.log('calculate softeningPoint > [body]');

    const softeningPoint = await this.softeningPointService.calculateSofteningPoint(body);

    if (softeningPoint.success) this.logger.log('calculate softening point > [success]');
    else this.logger.error('calculate softening point > [error]');

    return softeningPoint;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de ponto de amolecimento no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de ponto de amolecimento salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio de ponto de amolecimento no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_SofteningPoint_Dto & Calc_SofteningPoint_Out) {
    this.logger.log('save softeningPoint > [body]');

    const softeningPoint = await this.softeningPointService.saveEssay(body);

    if (softeningPoint.success) this.logger.log('save softeningPoint > [success]');
    else this.logger.error('save softeningPoint > [error]');

    return response.status(200).json(softeningPoint);
  }
}
import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from 'express';
import { AdhesionInitDto } from "../dto/adhesion-init.dto";
import { AdhesionService } from "../service/adhesion.service";
import { Calc_Adhesion_Dto, Calc_Adhesion_Out } from "../dto/calc.adhesion.dto";

@ApiTags('adhesion')
@Controller('asphalt/essays/adhesion')
export class AdhesionController {
  private logger = new Logger(AdhesionController.name);

  constructor(private readonly adhesionService: AdhesionService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de adesão com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de adesão com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de adesão com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de adesão com os dados enviados.' })
  async verifyInitAdhesion(@Res() response: Response, @Body() body: AdhesionInitDto) {
    this.logger.log('verify init adhesion > [body]');

    const status = await this.adhesionService.verifyInitAdhesion(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados d ensaio de adesão com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados d ensaio de adesão calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados d ensaio de adesão com os dados enviados.' })
  async calculateAdhesion(@Body() body: Calc_Adhesion_Dto) {
    this.logger.log('calculate adhesion > [body]');

    const adhesion = await this.adhesionService.calculateAdhesion(body);

    if (adhesion.success) this.logger.log('calculate adhesion > [success]');
    else this.logger.error('calculate adhesion > [error]');

    return adhesion;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados d ensaio de adesão no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados d ensaio de adesão salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados d ensaio de adesão no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Adhesion_Dto & Calc_Adhesion_Out) {
    this.logger.log('save adhesion > [body]');

    const adhesion = await this.adhesionService.saveEssay(body);

    if (adhesion.success) this.logger.log('save adhesion > [success]');
    else this.logger.error('save adhesion > [error]');

    return response.status(200).json(adhesion);
  }
}

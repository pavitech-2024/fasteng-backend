import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Calc_SayboltFurol_Dto, Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";
import { SayboltFurolInitDto } from "../dto/init-sayboltFurol.dto";
import { Response } from 'express';
import { SayboltFurolService } from "../service";

@ApiTags('sayboltFurol')
@Controller('asphalt/essays/sayboltFurol')
export class SayboltFurolController {
  private logger = new Logger(SayboltFurolController.name);

  constructor(private readonly sayboltFurolService: SayboltFurolService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de viscosidadeSaybolt-Furol com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.' })
  async verifyInitSayboltFurol(@Res() response: Response, @Body() body: SayboltFurolInitDto) {
    this.logger.log('verify init sayboltFurol > [body]');

    const status = await this.sayboltFurolService.verifyInitSayboltFurol(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de viscosidadeSaybolt-Furol com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados d ensaio de viscosidadeSaybolt-Furol calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de viscosidadeSaybolt-Furol com os dados enviados.' })
  async calculateSayboltFurol(@Body() body: Calc_SayboltFurol_Dto) {
    this.logger.log('calculate sayboltFurol > [body]');

    const sayboltFurol = await this.sayboltFurolService.calculateSayboltFurol(body);

    if (sayboltFurol.success) this.logger.log('calculate sayboltFurol > [success]');
    else this.logger.error('calculate sayboltFurol > [error]');

    return sayboltFurol;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de viscosidade Saybolt-Furol no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de viscosidadeSaybolt-Furol salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio de viscosidade Saybolt-Furol no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_SayboltFurol_Dto & Calc_SayboltFurol_Out) {
    this.logger.log('save sayboltFurol > [body]');

    const sayboltFurol = await this.sayboltFurolService.saveEssay(body);

    if (sayboltFurol.success) this.logger.log('save sayboltFurol > [success]');
    else this.logger.error('save sayboltFurol > [error]');

    return response.status(200).json(sayboltFurol);
  }
}
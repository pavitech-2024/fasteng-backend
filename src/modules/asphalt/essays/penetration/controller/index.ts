import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PenetrationService } from "../service";
import { PenetrationInitDto } from "../dto/penetration-init.dto";
import { Response } from 'express';
import { Calc_Penetration_Dto, Calc_Penetration_Out } from "../dto/calc.penetration.dto";

@ApiTags('penetration')
@Controller('soils/essays/penetration')
export class PenetrationController {
  private logger = new Logger(PenetrationController.name);

  constructor(private readonly penetrationService: PenetrationService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de penetração com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de penetração com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de penetração com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de penetração com os dados enviados.' })
  async verifyInitPenetration(@Res() response: Response, @Body() body: PenetrationInitDto) {
    this.logger.log('verify init penetration > [body]');

    const status = await this.penetrationService.verifyInitPenetration(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de penetração com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio de penetração calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de penetração com os dados enviados.' })
  async calculatePenetration(@Body() body: Calc_Penetration_Dto) {
    this.logger.log('calculate penetration > [body]');

    const penetration = await this.penetrationService.calculatePenetration(body);

    if (penetration.success) this.logger.log('calculate penetration > [success]');
    else this.logger.error('calculate penetration > [error]');

    return penetration;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de penetração no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de penetração salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados do ensaio de penetração no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'Penetration with name "Penetration 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio de penetração no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Penetration_Dto & Calc_Penetration_Out) {
    this.logger.log('save essay > [body]');

    const penetration = await this.penetrationService.saveEssay(body);

    if (penetration.success) this.logger.log('save penetration essay > [success]');
    else this.logger.error('save penetration essay > [error]');

    return response.status(200).json(penetration);
  }
}
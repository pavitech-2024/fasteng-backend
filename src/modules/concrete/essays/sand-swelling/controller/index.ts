import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SandSwellingService } from '../service';
import { Calc_SandSwelling_Dto } from '../dto/calc.sand-swelling.dto';
import { SandSwellingInitDto } from '../dto/sand-swelling-init.dto';


@ApiTags('sandIncrease')
@Controller('concrete/essays/sand-increase')
export class SandSwellingController {
  private logger = new Logger(SandSwellingController.name);

  constructor(
    private readonly sandSwellingService: SandSwellingService
  ){}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de Inchamento de Areia com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de Inchamento de Areia com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de Inchamento de Areia com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de Inchamento de Areia com os dados enviados.' })
  async verifyInitSandSwelling(@Res() response: Response, @Body() body: SandSwellingInitDto) {
    this.logger.log('verify init sand increase > [body]');

    const status = await this.sandSwellingService.verifyInitSandSwelling(body);

    return response.status(200).json(status);
  }

  @Post('calculate-unit-mass')
  async calculateUnitMass(@Res() response: Response, @Body() body: any) {
    this.logger.log('sand increase - calculate unit mass > [body]');

    const status = await this.sandSwellingService.calculateUnitMass(body);

    return response.status(200).json(status);
  }

  @Post('calculate-moisture-content')
  async calculateMoistureContent(@Res() response: Response, @Body() body: any) {
    this.logger.log('sand increase - calculate moisture content > [body]');

    const status = await this.sandSwellingService.calculateMoistureContent(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de Inchamento de Areia com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio de Inchamento de Areia calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de Inchamento de Areia com os dados enviados.' })
  async calculateSandSwelling(@Body() body: Calc_SandSwelling_Dto) {
    this.logger.log('calculate sand-increase > [body]');

    const sandSwelling = await this.sandSwellingService.calculateSandSwelling(body);

    if (sandSwelling.success) this.logger.log('calculate sand-increase > [success]');
    else this.logger.error('calculate sand-increase > [error]');

    return sandSwelling;
  }
}

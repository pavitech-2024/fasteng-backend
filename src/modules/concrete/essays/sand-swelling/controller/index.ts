import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SandSwellingService } from '../service';
import { SandSwellingInitDto } from '../dto/sand-swelling-init.dto';
import { Calc_SandSwelling_Dto } from '../dto/calc.sand-swelling.dto';

@ApiTags('sandSwelling')
@Controller('concrete/essays/sand-swelling')
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
    this.logger.log('verify init sand swelling > [body]');

    const status = await this.sandSwellingService.verifyInitSandSwelling(body);

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
    this.logger.log('calculate sand-swelling > [body]');

    const sandSwelling = await this.sandSwellingService.calculateSandSwelling(body);

    if (sandSwelling.success) this.logger.log('calculate sand-swelling > [success]');
    else this.logger.error('calculate sand-swelling > [error]');

    return sandSwelling;
  }
}

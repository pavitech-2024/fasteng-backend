import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CbrService } from '../service';
import { CbrInitDto } from '../dto/cbr-init.dto';
import { Response } from 'express';
import { Calc_CBR_Dto, Calc_CBR_Out } from '../dto/calc.cbr.dto';

@ApiTags('cbr')
@Controller('soils/essays/cbr')
export class CbrController {
  private logger = new Logger(CbrController.name);

  constructor(private readonly cbrService: CbrService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma CBR com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma CBR com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma CBR com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma CBR com os dados enviados.' })
  async verifyInitCbr(@Res() response: Response, @Body() body: CbrInitDto) {
    this.logger.log('verify init cbr > [body]');

    const status = await this.cbrService.verifyInitCbr(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados da CBR com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados da CBR calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da CBR com os dados enviados.' })
  async calculateCbr(@Body() body: Calc_CBR_Dto) {
    this.logger.log('calculate cbr > [body]');

    const cbr = await this.cbrService.calculateCbr(body);

    if (cbr.success) this.logger.log('calculate cbr > [success]');
    else this.logger.error('calculate cbr > [error]');

    return cbr;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados da CBR no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados da CBR salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados da CBR no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'CBR with name "CBR 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da CBR no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_CBR_Dto & Calc_CBR_Out) {
    this.logger.log('save essay > [body]');

    const cbr = await this.cbrService.saveEssay(body);

    if (cbr.success) this.logger.log('save cbr essay > [success]');
    else this.logger.error('save cbr essay > [error]');

    return response.status(200).json(cbr);
  }
}

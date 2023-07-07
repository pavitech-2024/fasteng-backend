import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HrbService } from '../service';
import { HrbInitDto } from '../dto/hrb-init.dto';
import { Calc_HRB_Dto, Calc_HRB_Out } from '../dto/calc.hrb.dto';

@ApiTags('hrb')
@Controller('soils/essays/hrb')
export class HrbController {
  private logger = new Logger(HrbController.name);

  constructor(private readonly hrbService: HrbService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma HRB com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma HRB com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma HRB com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma HRB com os dados enviados.' })
  async verifyInitCbr(@Res() response: Response, @Body() body: HrbInitDto) {
    this.logger.log('verify init cbr > [body]');

    const status = await this.hrbService.verifyInitHrb(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados da HRB com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados da HRB calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da HRB com os dados enviados.' })
  async calculateHrb(@Body() body: Calc_HRB_Dto) {
    this.logger.log('calculate hrb > [body]');

    const hrb = await this.hrbService.calculateHrb(body);

    if (hrb.success) this.logger.log('calculate hrb > [success]');
    else this.logger.error('calculate hrb > [error]');

    return hrb;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados da HRB no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados da HRB salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados da HRB no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'HRB with name "HRB 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da HRB no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_HRB_Dto & Calc_HRB_Out) {
    this.logger.log('save hrb > [body]');

    const hrb = await this.hrbService.saveEssay(body);

    if (hrb.success) this.logger.log('save hrb > [success]');
    else this.logger.error('save hrb > [error]');

    return response.status(200).json(hrb);
  }
}

import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FwdService } from '../services';
import { FwdInitDto } from '../dto/init-fwd.dto';
import { Calc_Fwd_Dto, Calc_Fwd_Out } from '../dto/calc-fwd.dto';
import { Response } from 'express';

@ApiTags('fwd')
@Controller('asphalt/essays/fwd')
export class FwdController {
  private logger = new Logger(FwdController.name);

  constructor(private readonly fwdService: FwdService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio fwd com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio fwd com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar um ensaio fwd com os dados enviados.',
  })
  async verifyInitFwd(@Res() response: Response, @Body() body: FwdInitDto) {
    this.logger.log('verify init fwd > [body]');

    const status = await this.fwdService.verifyInitFwd(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio fwd com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio fwd calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio fwd com os dados enviados.' })
  async calculateFwd(@Body() body: Calc_Fwd_Dto) {
    this.logger.log('calculate fwd > [body]');

    const fwd = await this.fwdService.calculateFwd(body);

    if (fwd.success) this.logger.log('calculate fwd > [success]');
    else this.logger.error('calculate fwd > [error]');

    return fwd;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio fwd no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio fwd salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio fwd no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Fwd_Dto & Calc_Fwd_Out) {
    this.logger.log('save fwd > [body]');

    const fwd = await this.fwdService.saveEssay(body);

    if (fwd.success) this.logger.log('save fwd > [success]');
    else this.logger.error('save fwd > [error]');

    return response.status(200).json(fwd);
  }
}

import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Calc_Rt_Dto, Calc_Rt_Out } from '../dto/calc-rt.dto';
import { Response } from 'express';
import { RtService } from '../service/rt.service';
// import { RtInitDto } from '../dto/init-rt.dto'; // ver se precisa trocar o parametro any Body do verifyInitRt

@ApiTags('rt')
@Controller('asphalt/essays/rt')
export class RtController {
  private logger = new Logger(RtController.name);

  constructor(private readonly rtService: RtService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio rt com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio rt com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio rt com os dados enviados.',
    content: {
      'application/json': {
        schema: {
          example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar um ensaio rt com os dados enviados.',
  })
  async verifyInitRt(@Res() response: Response, @Body() body: any) {
    this.logger.log('verify init rt > [body]');

    const status = await this.rtService.verifyInitRt(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio rt com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio rt calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio rt com os dados enviados.' })
  async calculateRt(@Body() body: Calc_Rt_Dto) {
    this.logger.log('calculate rt > [body]');

    const rt = await this.rtService.calculateRt(body);

    if (rt.success) this.logger.log('calculate rt > [success]');
    else this.logger.error('calculate rt > [error]');

    return rt;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio rt no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio rt salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio rt no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Rt_Dto & Calc_Rt_Out) {
    this.logger.log('save rt > [body]');

    const rt = await this.rtService.saveEssay(body);

    if (rt.success) this.logger.log('save rt > [success]');
    else this.logger.error('save rt > [error]');

    return response.status(200).json(rt);
  }
}

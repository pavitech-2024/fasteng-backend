import { Body, Controller, Delete, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RtcdService } from '../service/rtcd.service';
import { RtcdInitDto } from '../dto/init-rtcd.dto'; // ver se precisa trocar o parametro any Body do verifyInitRtcd
import { Calc_Rtcd_Dto, Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';
import { Response } from 'express';

@ApiTags('rtcd')
@Controller('asphalt/essays/rtcd')
export class RtcdController {
  private logger = new Logger(RtcdController.name);

  constructor(private readonly rtcdService: RtcdService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio rtcd com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio rtcd com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio rtcd com os dados enviados.',
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
    description: 'Erro ao verificar se é possível criar um ensaio rtcd com os dados enviados.',
  })
  async verifyInitRtcd(@Res() response: Response, @Body() body: RtcdInitDto) {
    this.logger.log('verify init rtcd > [body]');

    const status = await this.rtcdService.verifyInitRtcd(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio rtcd com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio rtcd calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio rtcd com os dados enviados.' })
  async calculateRtcd(@Body() body: Calc_Rtcd_Dto) {
    this.logger.log('calculate rtcd > [body]');

    const rtcd = await this.rtcdService.calculateRtcd(body);

    if (rtcd.success) this.logger.log('calculate rtcd > [success]');
    else this.logger.error('calculate rtcd > [error]');

    return rtcd;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio rtcd no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio rtcd salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio rtcd no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Rtcd_Dto & Calc_Rtcd_Out) {
    this.logger.log('save rtcd > [body]');

    const rtcd = await this.rtcdService.saveEssay(body);

    if (rtcd.success) this.logger.log('save rtcd > [success]');
    else this.logger.error('save rtcd > [error]');

    return response.status(200).json(rtcd);
  }

  @Delete('delete-essay/:id')
  @ApiOperation({ summary: 'Se possível, deleta os dados do ensaio rtcd no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Ensaio de rtcd deletado com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao deletar o ensaio rtcd no banco de dados.' })
  async deleteEssay(@Res() response: Response, @Param() param: {id: string}) {
    this.logger.log('delete rtcd > [body]');

    const rtcd = await this.rtcdService.deleteEssay(param.id);

    if (rtcd.success) this.logger.log('delete rtcd > [success]');
    else this.logger.error('delete rtcd > [error]');

    return response.status(200).json(rtcd);
  }
}

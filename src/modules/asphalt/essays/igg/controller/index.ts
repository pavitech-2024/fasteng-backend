import { Body, Controller, Delete, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IggService } from '../services';
import { IggInitDto } from '../dto/init-igg.dto';
import { Calc_Igg_Dto, Calc_Igg_Out } from '../dto/calc-igg.dto';
import { Response } from 'express';

@ApiTags('igg')
@Controller('asphalt/essays/igg')
export class IggController {
  private logger = new Logger(IggController.name);

  constructor(private readonly iggService: IggService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio igg com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio igg com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar um ensaio igg com os dados enviados.',
  })
  async verifyInitIgg(@Res() response: Response, @Body() body: IggInitDto) {
    this.logger.log('verify init igg > [body]');

    const status = await this.iggService.verifyInitIgg(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio igg com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio igg calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio igg com os dados enviados.' })
  async calculateIgg(@Body() body: Calc_Igg_Dto) {
    this.logger.log('calculate igg > [body]');

    const igg = await this.iggService.calculateIgg(body);

    if (igg.success) this.logger.log('calculate igg > [success]');
    else this.logger.error('calculate igg > [error]');

    return igg;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio igg no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio igg salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio igg no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Igg_Dto & Calc_Igg_Out) {
    this.logger.log('save igg > [body]');

    const igg = await this.iggService.saveEssay(body);

    if (igg.success) this.logger.log('save igg > [success]');
    else this.logger.error('save igg > [error]');

    return response.status(200).json(igg);
  }

  @Delete('delete-essay/:id')
  @ApiOperation({ summary: 'Se possível, deleta os dados do ensaio igg no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Ensaio de igg deletado com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao deletar o ensaio igg no banco de dados.' })
  async deleteEssay(@Res() response: Response, @Param() id: string) {
    this.logger.log('delete igg > [body]');

    const igg = await this.iggService.deleteEssay(id);

    if (igg.success) this.logger.log('delete igg > [success]');
    else this.logger.error('delete igg > [error]');

    return response.status(200).json(igg);
  }
}

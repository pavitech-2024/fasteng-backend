import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChapmanInitDto } from '../dto/chapman-init.dto';
import { ChapmanService } from '../service';
import { Calc_CHAPMAN_Out, Calc_CHAPMAN_dto } from '../dto/calc.chapman.dto';
import { Response } from 'express';

@ApiTags('chapman')
@Controller('concrete/essays/chapman')
export class ChapmanController {
  private logger = new Logger(ChapmanController.name);

  constructor(private readonly chapmanService: ChapmanService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma Chapman com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma Chapman com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma Chapman com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma Chapman com os dados enviados.' })
  async verifyInitChapman(@Res() response: Response, @Body() body: ChapmanInitDto) {
    this.logger.log('verify init chapman > [body]');

    const status = await this.chapmanService.verifyInitChapman(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados da Chapman com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados da Chapman calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da Chapman com os dados enviados.' })
  async calculateChapman(@Body() body: Calc_CHAPMAN_dto) {
    this.logger.log('calculate chapman > [body]');

    const chapman = await this.chapmanService.calculateChapman(body);

    if (chapman.success) this.logger.log('calculate chapman > [success]');
    else this.logger.error('calculate chapman > [error]');

    return chapman;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados da Chapman no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados da Chapman salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da Chapman no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_CHAPMAN_dto & Calc_CHAPMAN_Out) {
    this.logger.log('save chapman > [body]');

    const chapman = await this.chapmanService.saveEssay(body);

    if (chapman.success) this.logger.log('save chapman > [success]');
    else this.logger.error('save chapman > [error]');

    return response.status(200).json(chapman);
  }
}

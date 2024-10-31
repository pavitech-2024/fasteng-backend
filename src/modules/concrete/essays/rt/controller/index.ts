import { Controller, Logger, Post, Res, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { ConcreteRtInitDto } from '../dto/concretert-init.dto';
import { ConcreteRtService } from '../service';
import { Response } from 'express';
import { Calc_Concrete_RT_Dto, Calc_Concrete_RT_Out } from '../dto/calc.rt.dto';
import { ConcreteRtInterpolationDto } from '../dto/concrete-rt-interpolation.dto';

@ApiTags('concreteRt')
@Controller('concrete/essays/concreteRt')
export class ConcreteRtController {
  private logger = new Logger(ConcreteRtController.name);

  constructor(private readonly concreteRtService: ConcreteRtService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma resistência à tração de concreto com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma resistência à tração de concreto com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma resistência à tração de concreto com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar uma resistência à tração de concreto com os dados enviados.',
  })
  async verifyInitConcreteRt(@Res() response: Response, @Body() body: ConcreteRtInitDto) {
    this.logger.log('verify init concrete rt > [body]');

    const status = await this.concreteRtService.verifyInitRt(body);

    return response.status(200).json(status);
  }

  @Post('interpolation')
  @ApiOperation({
    summary: 'Realiza uma tnterpolação com os valores recebidos do segundo passo do ensaio de resistência à tração em concreto.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna um valor de tolerância gerado a partir da interpolação dos dados enviados no ensaio de resistência à tração.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  async calculateConcreteRcInterpolation(@Res() response: Response, @Body() body: ConcreteRtInterpolationDto) {
    this.logger.log('verify init concrete rt > [body]');

    const status = await this.concreteRtService.calculateConcreteRtInterpolation(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados da resistência à tração de concreto com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados da resistência à tração de concreto calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao calcular os resultados da resistência à tração de concreto com os dados enviados.',
  })
  async calculateConcreteRt(@Body() body: Calc_Concrete_RT_Dto) {
    this.logger.log('calculate concrete rt > [body]');

    const rt = await this.concreteRtService.calculateRt(body);

    if (rt.success) this.logger.log('calculate concrete rt > [success]');
    else this.logger.error('calculate concrete rt > [error]');

    return rt;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados da resistência à tração de concreto no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados da resistência à tração de concreto salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados da resistência à tração de concreto no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'Rt with name "Rt 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao salvar os dados da resistência à tração de concreto no banco de dados.',
  })
  async saveConcreteEssay(@Res() response: Response, @Body() body: Calc_Concrete_RT_Dto & Calc_Concrete_RT_Out) {
    this.logger.log('save concrete essay > [body]');

    const rt = await this.concreteRtService.saveEssay(body);

    if (rt.success) this.logger.log('save concrete rt essay > [success]');
    else this.logger.error('save concrete rt essay > [error]');

    return response.status(200).json(rt);
  }
}

import { Controller, Logger, Post, Res, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
import { ConcreteRcInitDto } from '../dto/concretert-init.dto';
import { Response } from 'express';
import { ConcreteRcService } from '../service';

@ApiTags('concreteRc')
@Controller('concrete/essays/concreteRc')
export class ConcreteRcController {
  private logger = new Logger(ConcreteRcController.name);

  constructor(private readonly concretercService: ConcreteRcService) {}

  @Post('verify-init')
  @ApiOperation({
    summary: 'Verifica se é possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
  })
  @ApiResponse({
    status: 200,
    description: 'É possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
  })
  async verifyInitConcreteRc(@Res() response: Response, @Body() body: ConcreteRcInitDto) {
    this.logger.log('verify init concrete rc > [body]');

    const status = await this.concretercService.verifyInitRc(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados da granulometria de ensaio de concreto com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados da granulometria de ensaio de concreto calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao calcular os resultados da granulometria de ensaio de concreto com os dados enviados.',
  })
  async calculateConcreteRc(@Body() body: Calc_CONCRETERC_Dto) {
    this.logger.log('calculate concrete rc > [body]');

    const rc = await this.concretercService.calculateRc(body);

    if (rc.success) this.logger.log('calculate concrete rc > [success]');
    else this.logger.error('calculate concrete rc > [error]');

    return rc;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados da granulometria de ensaio de concreto no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados da granulometria de ensaio de concreto salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados da granulometria de ensaio de concreto no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'Rc with name "Rc 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao salvar os dados da granulometria de ensaio de concreto no banco de dados.',
  })
  async saveConcreteEssay(@Res() response: Response, @Body() body: Calc_CONCRETERC_Dto & Calc_CONCRETERC_Out) {
    this.logger.log('save concrete essay > [body]');

    const rc = await this.concretercService.saveEssay(body);

    if (rc.success) this.logger.log('save concrete rc essay > [success]');
    else this.logger.error('save concrete rc essay > [error]');

    return response.status(200).json(rc);
  }
}

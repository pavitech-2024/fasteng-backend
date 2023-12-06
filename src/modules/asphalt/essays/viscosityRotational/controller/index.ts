import { Controller, Logger, Post, Res, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Calc_ViscosityRotational_Dto, Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';
import { ViscosityRotationalInitDto } from '../dto/init-viscosityRotational.dto';
import { ViscosityRotationalService } from '../service/viscosityRotational.service';

@ApiTags('viscosityRotational')
@Controller('asphalt/essays/viscosityRotational')
export class ViscosityRotationalController {
  private logger = new Logger(ViscosityRotationalController.name);

  constructor(private readonly viscosityRotationalService: ViscosityRotationalService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de viscosidade rotacional com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de viscosidade rotacional com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de viscosidade rotacional com os dados enviados.',
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
    description: 'Erro ao verificar se é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.',
  })
  async verifyInitViscosityRotational(@Res() response: Response, @Body() body: ViscosityRotationalInitDto) {
    this.logger.log('verify init viscosityRotational > [body]');

    const status = await this.viscosityRotationalService.verifyInitViscosityRotational(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de viscosidade rotacional com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados d ensaio de viscosidade rotacional calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao calcular os resultados do ensaio de viscosidade rotacional com os dados enviados.',
  })
  async calculateViscosityRotational(@Body() body: Calc_ViscosityRotational_Dto) {
    this.logger.log('calculate viscosityRotational > [body]');

    const viscosityRotational = await this.viscosityRotationalService.calculateViscosityRotational(body);

    if (viscosityRotational.success) this.logger.log('calculate viscosityRotational > [success]');
    else this.logger.error('calculate viscosityRotational > [error]');

    return viscosityRotational;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de viscosidade rotacional no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de viscosidade rotacional salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao salvar os dados do ensaio de viscosidade rotacional no banco de dados.',
  })
  async saveEssay(
    @Res() response: Response,
    @Body() body: Calc_ViscosityRotational_Dto & Calc_ViscosityRotational_Out,
  ) {
    this.logger.log('save viscosityRotational > [body]');

    const viscosityRotational = await this.viscosityRotationalService.saveEssay(body);

    if (viscosityRotational.success) this.logger.log('save viscosityRotational > [success]');
    else this.logger.error('save viscosityRotational > [error]');

    return response.status(200).json(viscosityRotational);
  }
}

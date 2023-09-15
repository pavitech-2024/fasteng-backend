/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Logger, Post, Res, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitMass_Init_Dto } from '../dto/unitMass-init.dto';
import { UnitMassService } from '../service';
import { UnitMass_Step2_Dto } from '../dto/unitMass-step2.dto';
import { Result_UnitMass_Dto, UnitMass_Result } from '../dto/unitMass-result.dto';
import { Response } from 'express';

@ApiTags('unitMass')
@Controller('concrete/essays/unitMass')
export class UnitMassController {
  private logger = new Logger(UnitMassController.name);

  constructor(private readonly UnitMassService: UnitMassService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma massa unitária com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma massa unitária com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma massa unitária com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar uma massa unitária com os dados enviados.',
  })
  async verifyInitUnitMass(@Res() response: Response, @Body() body: UnitMass_Init_Dto) {
    this.logger.log('verify init unitMass > [body]');

    const status = await this.UnitMassService.verifyInitUnitMass(body);

    return response.status(200).json(status);
  }

  @Post('step2-unitMass-data')
  @ApiOperation({ summary: 'Verifica se é possível criar uma massa unitária com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma massa unitária com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma massa unitária com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar uma massa unitária com os dados enviados.',
  })
  async verifyStep2DataUnitMass(@Res() response: Response, @Body() body: UnitMass_Step2_Dto) {
    this.logger.log('verify init unitMass > [body]');

    const status = await this.UnitMassService.verifyStep2DataUnitMass(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados da massa unitária com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados da massa unitária calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da massa unitária com os dados enviados.' })
  async calculateUnitMass(@Body() body: Result_UnitMass_Dto) {
    this.logger.log('calculate chapman > [body]');

    const unitMass = await this.UnitMassService.resultUnitMass(body);

    if (unitMass.success) this.logger.log('calculate unitMass > [success]');
    else this.logger.error('calculate unitMass > [error]');

    return unitMass;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados da massa unitária no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados da massa unitária salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da massa unitária no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Result_UnitMass_Dto & UnitMass_Result) {
    this.logger.log('save unitMass > [body]');

    const unitMass = await this.UnitMassService.saveEssay(body);

    if (unitMass.success) this.logger.log('save unitMass > [success]');
    else this.logger.error('save unitMass > [error]');

    return response.status(200).json(unitMass);
  }
}

import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from "../dto/asphalt.calc.granulometry.dto";
import { AsphaltGranulometryService } from "../service";
import { AsphaltGranulometryInitDto } from "../dto/asphalt.granulometry-init.dto";
import { Response } from 'express';

@Controller('controller')
export class ControllerController {}

@ApiTags('granulometry')
@Controller('asphalt/essays/granulometry')
export class AsphaltGranulometryController {
  private logger = new Logger(AsphaltGranulometryController.name);

  constructor(private readonly asphaltgranulometryService: AsphaltGranulometryService) { }

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma granulometria de ensaio de pavimentação asfáltica com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma granulometria de ensaio de pavimentação asfáltica com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma granulometria de ensaio de pavimentação asfáltica com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma granulometria de ensaio de pavimentação asfáltica com os dados enviados.' })
  async verifyInitAsphaltGranulometry(@Res() response: Response, @Body() body: AsphaltGranulometryInitDto) {
    this.logger.log('verify init asphalt granulometry > [body]');

    const status = await this.asphaltgranulometryService.verifyInitGranulometry(body);
    

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados da granulometria de ensaio de pavimentação asfáltica com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados da granulometria de ensaio de pavimentação asfáltica calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da granulometria de ensaio de pavimentação asfáltica com os dados enviados.' })
  async calculateAsphaltGranulometry(@Body() body:  Calc_AsphaltGranulometry_Dto) {
    this.logger.log('calculate concrete granulometry > [body]');

    const granulometry = await this.asphaltgranulometryService.calculateGranulometry(body);

    if (granulometry.success) this.logger.log('calculate concrete granulometry > [success]');
    else this.logger.error('calculate concrete granulometry > [error]');

    return granulometry;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados da granulometria de ensaio de pavimentação asfáltica no banco de dados.' })
  @ApiResponse({
      status: 200,
      description: 'Dados da granulometria de ensaio de pavimentação asfáltica salvos com sucesso.',
      content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados da granulometria de ensaio de pavimentação asfáltica no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'Granulometry with name "Granulometry 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da granulometria de ensaio de pavimentação asfáltica no banco de dados.' })
  async saveAsphaltEssay(@Res() response: Response, @Body() body: Calc_AsphaltGranulometry_Dto & Calc_AsphaltGranulometry_Out) {
    this.logger.log('save concrete essay > [body]');

    const granulometry = await this.asphaltgranulometryService.saveEssay(body);

    if (granulometry.success) this.logger.log('save concrete granulometry essay > [success]');
    else this.logger.error('save concrete granulometry essay > [error]');

    return response.status(200).json(granulometry);
  }
}
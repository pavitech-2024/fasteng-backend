import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SandIncreaseService } from '../service';
import { Calc_SandIncrease_Dto, Calc_SandIncrease_Out } from '../dto/calc.sand-increase.dto';
import { SandIncreaseInitDto } from '../dto/sand-increase-init.dto';
import { Calc_Compression_Out } from 'modules/soils/essays/compression/dto/calc.compression.dto';


@ApiTags('sandIncrease')
@Controller('concrete/essays/sand-increase')
export class SandIncreaseController {
  private logger = new Logger(SandIncreaseController.name);

  constructor(
    private readonly sandIncreaseService: SandIncreaseService
  ){}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de Inchamento de Areia com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de Inchamento de Areia com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de Inchamento de Areia com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de Inchamento de Areia com os dados enviados.' })
  async verifyInitSandIncrease(@Res() response: Response, @Body() body: SandIncreaseInitDto) {
    this.logger.log('verify init sand increase > [body]');

    const status = await this.sandIncreaseService.verifyInitSandIncrease(body);

    return response.status(200).json(status);
  }
  

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de Inchamento de Areia com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio de Inchamento de Areia calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de Inchamento de Areia com os dados enviados.' })
  async calculateSandIncrease(@Body() body: any) {
    this.logger.log(`'calculate sand-increase > [body]' ${body}`);

    const sandIncrease = await this.sandIncreaseService.calculateSandIncrease(body);

    if (sandIncrease.success) this.logger.log('calculate sand-increase > [success]');
    else this.logger.error('calculate sand-increase > [error]');

    return sandIncrease;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de incgamento de areia no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de inchamento de areia salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados do ensaio de inchamento de areia no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: {
              message: 'Sand increase essay with name "Sand increase 1" from user "user 1"',
              status: 400,
              name: 'AlreadyExists',
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio de inchamento de areia no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: any) {
    this.logger.log('save essay > [body]');

    const sandIncrease = await this.sandIncreaseService.saveEssay(body);

    if (sandIncrease.success) this.logger.log('save sandIncrease essay > [success]');
    else this.logger.error('save sandIncrease essay > [error]');

    return response.status(200).json(sandIncrease);
  }
}


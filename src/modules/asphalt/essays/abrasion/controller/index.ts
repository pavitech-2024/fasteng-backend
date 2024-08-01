import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from 'express';
import { AbrasionInitDto } from "../dto/abrasion-init.dto";
import { Calc_Abrasion_Dto, Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";
import { AbrasionService } from "../service";

@ApiTags('abrasion')
@Controller('asphalt/essays/abrasion')
export class AbrasionController {
  private logger = new Logger(AbrasionController.name);

  constructor(private readonly abrasionService: AbrasionService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de abrasão com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de abrasão com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de abrasão com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de abrasão com os dados enviados.' })
  async verifyInitAbrasion(@Res() response: Response, @Body() body: AbrasionInitDto) {
    this.logger.log('verify init abrasion > [body]');

    const status = await this.abrasionService.verifyInitAbrasion(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de abrasão com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio de abrasão calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de abrasão com os dados enviados.' })
  async calculateAbrasion(@Body() body: Calc_Abrasion_Dto) {
    this.logger.log('calculate abrasion > [body]');

    const abrasion = await this.abrasionService.calculateAbrasion(body);

    if (abrasion.success) this.logger.log('calculate abrasion > [success]');
    else this.logger.error('calculate abrasion > [error]');

    return abrasion;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de abrasão no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de abrasão salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados do ensaio de abrasão no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'Abrasion with name "Abrasion 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio de abrasão no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Abrasion_Dto & Calc_Abrasion_Out) {
    this.logger.log('save essay > [body]');

    const abrasion = await this.abrasionService.saveEssay(body);

    if (abrasion.success) this.logger.log('save abrasion essay > [success]');
    else this.logger.error('save abrasion essay > [error]');

    return response.status(200).json(abrasion);
  }
}
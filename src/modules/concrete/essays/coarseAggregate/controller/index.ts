import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { CoarseAggregateService } from '../service';
// import { CoarseAggregateInitDto } from '../dto/coarseAggregate-init.dto';
import { Response } from 'express';
// import { Calc_CoarseAggregate_Dto, Calc_CoarseAggregate_Out } from '../dto/calc.coarseAggregate.dto';

@ApiTags('coarse-aggregate')
@Controller('soils/essays/coarse-aggregate')
export class CoarseAggregateController {
  private logger = new Logger(CoarseAggregateController.name);

  // constructor(private readonly CoarseAggregateService: CoarseAggregateService) {}

  // @Post('verify-init')
  // @ApiOperation({ summary: 'Verifica se é possível criar uma CoarseAggregate com os dados enviados.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'É possível criar uma CoarseAggregate com os dados enviados.',
  //   content: { 'application/json': { schema: { example: { success: true } } } },
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Não é possível criar uma CoarseAggregate com os dados enviados.',
  //   content: {
  //     'application/json': {
  //       schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
  //     },
  //   },
  // })
  // @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma CoarseAggregate com os dados enviados.' })
  // async verifyInitCoarseAggregate(@Res() response: Response, @Body() body: CoarseAggregateInitDto) {
  //   this.logger.log('verify init CoarseAggregate > [body]');

  //   const status = await this.CoarseAggregateService.verifyInitCoarseAggregate(body);

  //   return response.status(200).json(status);
  // }

  // @Post('calculate-results')
  // @ApiOperation({ summary: 'Calcula os resultados da CoarseAggregate com os dados enviados.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Resultados da CoarseAggregate calculados com sucesso.',
  //   content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  // })
  // @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da CoarseAggregate com os dados enviados.' })
  // async calculateCoarseAggregate(@Body() body: Calc_CoarseAggregate_Dto) {
  //   this.logger.log('calculate CoarseAggregate > [body]');

  //   const CoarseAggregate = await this.CoarseAggregateService.calculateCoarseAggregate(body);

  //   if (CoarseAggregate.success) this.logger.log('calculate CoarseAggregate > [success]');
  //   else this.logger.error('calculate CoarseAggregate > [error]');

  //   return CoarseAggregate;
  // }

  // @Post('save-essay')
  // @ApiOperation({ summary: 'Se possível, salva os dados da CoarseAggregate no banco de dados.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Dados da CoarseAggregate salvos com sucesso.',
  //   content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Não foi possível salvar os dados da CoarseAggregate no banco de dados.',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         example: {
  //           success: false,
  //           error: { message: 'CoarseAggregate with name "CoarseAggregate 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
  //         },
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da CoarseAggregate no banco de dados.' })
  // async saveEssay(@Res() response: Response, @Body() body: Calc_CoarseAggregate_Dto & Calc_CoarseAggregate_Out) {
  //   this.logger.log('save essay > [body]');

  //   const CoarseAggregate = await this.CoarseAggregateService.saveEssay(body);

  //   if (CoarseAggregate.success) this.logger.log('save CoarseAggregate essay > [success]');
  //   else this.logger.error('save CoarseAggregate essay > [error]');

  //   return response.status(200).json(CoarseAggregate);
  // }
}

import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { CompressionService } from "../service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { CompressionInitDto } from "../dto/compression-init.dto";
import { Calc_Compression_Dto, Calc_Compression_Out } from "../dto/calc.compression.dto";

@ApiTags('compression')
@Controller('soils/essays/compression')
export class CompressionController {
  private logger = new Logger(CompressionController.name);

  constructor(private readonly compressionService: CompressionService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de compactação com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de compactação com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de compactação com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de compactação com os dados enviados.' })

  async verifyInitCompression(@Res() response: Response, @Body() body: CompressionInitDto) {
    this.logger.log('verify init compression > [body]');

    const status = await this.compressionService.verifyInitCompression(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de compactação com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados do ensaio de compactação calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de compactação com os dados enviados.' })
  async calculateCompression(@Body() body: Calc_Compression_Dto) {
    this.logger.log('calculate compression > [body]');

    const cbr = await this.compressionService.calculateCompression(body);

    if (cbr.success) this.logger.log('calculate compression > [success]');
    else this.logger.error('calculate compression > [error]');

    return cbr;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de compactação no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de compactação salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados do ensaio de compactação no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'Compression essay with name "Compression 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio de compactação no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Compression_Dto & Calc_Compression_Out) {
    this.logger.log('save essay > [body]');

    const compression = await this.compressionService.saveEssay(body);

    if (compression.success) this.logger.log('save compression essay > [success]');
    else this.logger.error('save compression essay > [error]');

    return response.status(200).json(compression);
  }
}
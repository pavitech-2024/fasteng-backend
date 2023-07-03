import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { CompressionService } from "../service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CompressionInitDto } from "../dto/compression-init.dto";

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
}
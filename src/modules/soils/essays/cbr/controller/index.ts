import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CbrService } from '../service';
import { CbrInitDto } from '../dto/cbr-init.dto';
import { Response } from 'express';

@ApiTags('cbr')
@Controller('soils/essays/cbr')
export class CbrController {
  private logger = new Logger(CbrController.name);

  constructor(private readonly cbrService: CbrService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma CBR com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma CBR com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma CBR com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma CBR com os dados enviados.' })
  async verifyInitCbr(@Res() response: Response, @Body() body: CbrInitDto) {
    this.logger.log('verify init cbr > [body]');

    const status = await this.cbrService.verifyInitCbr(body);

    return response.status(200).json(status);
  }
}

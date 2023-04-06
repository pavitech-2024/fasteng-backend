import { Controller, Get, Logger, Param } from '@nestjs/common';
import { SamplesService } from '../service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('samples')
@Controller('soils/samples')
export class SamplesController {
  private logger = new Logger(SamplesController.name);

  constructor(private readonly samplesService: SamplesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma amostra do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra não encontrada!' })
  async getSampleById(@Param('id') id: string) {
    this.logger.log(`get sample by id > [id]: ${id}`);
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as amostras do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Amostras encontradas com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') id: string) {
    this.logger.log(`get all samples by user id > [id]: ${id}`);
  }
}

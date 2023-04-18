import { Body, Controller, Get, Logger, Param, Post, Req, Delete } from '@nestjs/common';
import { SamplesService } from '../service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { Request } from 'express';

@ApiTags('samples')
@Controller('soils/samples')
export class SamplesController {
  private logger = new Logger(SamplesController.name);

  constructor(private readonly samplesService: SamplesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma amostra no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Amostra criada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar amostra!' })
  async createSample(@Body() sample: CreateSampleDto, @Req() req: Request) {
    this.logger.log('create sample > [body]');
    const createdSample = await this.samplesService.createSample(sample, req);

    if (createdSample) this.logger.log(`sample created > [id]: ${createdSample._id}`);

    return createdSample;
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as amostras do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Amostras encontradas com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') id: string) {
    this.logger.log(`get all samples by user id > [id]: ${id}`);

    return this.samplesService.getAllSamples();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma amostra do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra não encontrada!' })
  async getSampleById(@Param('id') id: string) {
    this.logger.log(`get sample by id > [id]: ${id}`);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma amostra do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra deletada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra não encontrada!' })
  async deleteSampleById(@Param('id') id: string) {
    this.logger.log(`delete sample by id > [id]: ${id}`);

    return this.samplesService.deleteSample(id);
  }
}

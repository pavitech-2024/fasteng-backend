import { Controller, Get, Post, Body, Param, Delete, Put, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IggAnalysisService } from '../service/igg-analysis.service';
import { CreateIggAnalysisDto } from '../dto/create-igg-analysis.dto';
import { UpdateIggAnalysisDto } from '../dto/update-igg-analysis.dto';

@ApiTags('IGG Analysis')
@Controller('promedina/igg/igg-analysis')
export class IggAnalysisController {
  private logger = new Logger(IggAnalysisController.name);

  constructor(private readonly iggAnalysisService: IggAnalysisService) {}

  @Post('save')
  @ApiOperation({ summary: 'Cria uma análise IGG' })
  @ApiResponse({ status: 201, description: 'Análise IGG criada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar análise IGG!' })
  async create(@Body() createIggAnalysisDto: CreateIggAnalysisDto) {
    this.logger.log('create igg analysis > [body]');
    return this.iggAnalysisService.create(createIggAnalysisDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retorna todas as análises IGG' })
  @ApiResponse({ status: 200, description: 'Análises IGG encontradas!' })
  async findAll() {
    return this.iggAnalysisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma análise IGG por ID' })
  @ApiResponse({ status: 200, description: 'Análise IGG encontrada!' })
  @ApiResponse({ status: 404, description: 'Análise IGG não encontrada!' })
  async findOne(@Param('id') id: string) {
    return this.iggAnalysisService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma análise IGG' })
  @ApiResponse({ status: 200, description: 'Análise IGG atualizada!' })
  async update(
    @Param('id') id: string,
    @Body() updateIggAnalysisDto: UpdateIggAnalysisDto,
  ) {
    return this.iggAnalysisService.update(id, updateIggAnalysisDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma análise IGG' })
  @ApiResponse({ status: 200, description: 'Análise IGG deletada!' })
  async remove(@Param('id') id: string) {
    return this.iggAnalysisService.remove(id);
  }

  @Post(':id/process')
  @ApiOperation({ summary: 'Processa uma análise IGG' })
  async processAnalysis(@Param('id') id: string) {
    return this.iggAnalysisService.processAnalysis(id);
  }
}
import { Controller, Logger, Post, Body, Get, Param, Put, Delete, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { StabilizedLayers_Sample } from "../schemas";
import { StabilizedLayersSamplesService } from "../service/stabilized-layers-samples.service";
import { CreateStabilizedLayersSampleDto } from "../dto/create-stabilized-layers-sample.dto";
import { CommonQueryFilter } from "utils/queryFilter";

@ApiTags('samples')
@Controller('promedina/stabilized-layers/stabilized-layers-samples')
export class StabilizedLayersSamplesController {
  private logger = new Logger(StabilizedLayersSamplesController.name);

  constructor(private readonly stabilizedLayersSamplesService: StabilizedLayersSamplesService) {}

  @Post('save')
  @ApiOperation({ summary: 'Cria uma amostra de camadas stabilizedes no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Amostra de camadas stabilizedes criada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar amostra de camadas stabilizedes!' })
  async createSample(@Body() sample: CreateStabilizedLayersSampleDto) {
    this.logger.log('create stabilized layers sample > [body]');
    const createdSample = await this.stabilizedLayersSamplesService.createSample(sample);

    if (createdSample) this.logger.log(`grabular layer sample created > [id]: ${createdSample._id}`);

    return createdSample;
  }

  // @Get('all/:id')
  // @ApiOperation({ summary: 'Retorna todas as amostras de camadas stabilizedes do banco de dados de um usuário.' })
  // @ApiResponse({ status: 200, description: 'Amostras de camadas stabilizedes encontradas com sucesso!' })
  // @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  // async getAllByUserId(@Param('id') userId: string) {
  //   this.logger.log(`get all samples by user id > [id]: ${userId}`);

  //   return this.stabilizedLayersSamplesService.getAllSamples(userId);
  // }

  @Get('/filter')
  @ApiOperation({ summary: 'Retorna as amostras filtradas de camadas estabilizadas do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Amostras filtradas de camadas estabilizadas encontradas com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostras filtradas não encontradas!' })
  async getSamplesByFilter(@Query() queryFilter: CommonQueryFilter) {
    this.logger.log(`get samples by filter > [filter]: ${queryFilter}`)

    return this.stabilizedLayersSamplesService.getSamplesByFilter(queryFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma amostra de camadas stabilizedes do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de camadas stabilizedes encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de camadas stabilizedes não encontrada!' })
  async getSampleById(@Param('id') sampleId: string) {
    this.logger.log(`get sample by id > [id]: ${sampleId}`);

    return this.stabilizedLayersSamplesService.getSample(sampleId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma amostra de camadas stabilizedes do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de camadas stabilizedes atualizada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de camadas stabilizedes não encontrada!' })
  async updateSampleById(@Param('id') sampleId: string, @Body() sample: StabilizedLayers_Sample) {
    this.logger.log(`update sample by id > [id]: ${sampleId}`);

    return this.stabilizedLayersSamplesService.updateSample(sample);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma amostra de camadas stabilizedes do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de camadas stabilizedes deletada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de camadas stabilizedes não encontrada!' })
  async deleteSampleById(@Param('id') sampleId: string) {
    this.logger.log(`delete sample by id > [id]: ${sampleId}`);

    return this.stabilizedLayersSamplesService.deleteSample(sampleId);
  }
}
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Put } from '@nestjs/common';
import { GranularLayersSamplesService } from '../service/granular-layers-samples.service';
import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'config/decorators/user.decorator';
import { GranularLayers_Sample } from '../schemas';

@ApiTags('samples')
@Controller('promedina/granular-layers/granular-layers-samples')
export class GranularLayersSamplesController {
  private logger = new Logger(GranularLayersSamplesController.name);

  constructor(private readonly granularLayersSamplesService: GranularLayersSamplesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma amostra de camadas granulares no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Amostra de camadas granulares criada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar amostra de camadas granulares!' })
  async createSample(@Body() sample: any) {
    this.logger.log('create granular layers sample > [body]');
    const createdSample = await this.granularLayersSamplesService.createSample(sample);

    if (createdSample) this.logger.log(`grabular layer sample created > [id]: ${createdSample._id}`);

    return createdSample;
  }

  // @Get('all/:id')
  // @ApiOperation({ summary: 'Retorna todas as amostras de camadas granulares do banco de dados de um usuário.' })
  // @ApiResponse({ status: 200, description: 'Amostras de camadas granulares encontradas com sucesso!' })
  // @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  // async getAllByUserId(@Param('id') userId: string) {
  //   this.logger.log(`get all samples by user id > [id]: ${userId}`);

  //   return this.granularLayersSamplesService.getAllSamples(userId);
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma amostra de camadas granulares do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de camadas granulares encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de camadas granulares não encontrada!' })
  async getSampleById(@Param('id') sampleId: string) {
    this.logger.log(`get sample by id > [id]: ${sampleId}`);

    return this.granularLayersSamplesService.getSample(sampleId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma amostra de camadas granulares do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de camadas granulares atualizada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de camadas granulares não encontrada!' })
  async updateSampleById(@Param('id') sampleId: string, @Body() sample: GranularLayers_Sample) {
    this.logger.log(`update sample by id > [id]: ${sampleId}`);

    return this.granularLayersSamplesService.updateSample(sample);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma amostra de camadas granulares do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de camadas granulares deletada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de camadas granulares não encontrada!' })
  async deleteSampleById(@Param('id') sampleId: string) {
    this.logger.log(`delete sample by id > [id]: ${sampleId}`);

    return this.granularLayersSamplesService.deleteSample(sampleId);
  }
}

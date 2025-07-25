import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Put, Query, HttpException } from '@nestjs/common';
import { GranularLayersSamplesService } from '../service/granular-layers-samples.service';
import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GranularLayers_Sample } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';

@ApiTags('samples')
@Controller('promedina/granular-layers/granular-layers-samples')
export class GranularLayersSamplesController {
  private logger = new Logger(GranularLayersSamplesController.name);

  constructor(private readonly granularLayersSamplesService: GranularLayersSamplesService) {}

  @Post('save')
  @ApiOperation({ summary: 'Cria uma amostra de camadas granulares no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Amostra de camadas granulares criada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar amostra de camadas granulares!' })
  @ApiResponse({ status: 413, description: 'Imagens grandes demais!' })
  async createSample(@Body() sample: CreateGranularLayersSampleDto) {
    this.logger.log('Create granular layers sample > [body]');
    try {
      const createdSample = await this.granularLayersSamplesService.createSample(sample);
      

      if (createdSample) {
        this.logger.log(`Granular layer sample created > [id]: ${createdSample._id}`);

        return createdSample;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        const response: any = error.getResponse();
        if (response.status === 409) {
          return { success: false, error: { name: 'SampleCreationError', message: response['error'] } };
        }
      }

      this.logger.error(`Error on create sample > [error]: ${error}`);
      throw error;
    }
  }

  @Get('all')
  @ApiOperation({ summary: 'Retorna todas as amostras de camadas granulares do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostras de camadas granulares encontradas com sucesso!' })
  async getAll() {
    this.logger.log(`get all samples`);

    return this.granularLayersSamplesService.getAllSamples();
  }

  @Get('/filter')
  @ApiOperation({ summary: 'Retorna as amostras filtradas de camadas granulares do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Amostras filtradas de camadas granulares encontradas com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostras filtradas não encontradas!' })
  async getSamplesByFilter(@Query() queryFilter: CommonQueryFilter) {
    this.logger.log(`get samples by filter > [filter]: ${queryFilter}`);

    return this.granularLayersSamplesService.getSamplesByFilter(queryFilter);
  }

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

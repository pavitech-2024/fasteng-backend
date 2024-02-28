import { Controller, Logger, Post, Body, Get, Param, Put, Delete, Query, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BinderAsphaltConcrete_Sample } from '../schemas';
import { BinderAsphaltConcreteSamplesService } from '../service/binder-asphalt-concrete-samples.service';
import { CreateBinderAsphaltConcreteSampleDto } from '../dto/create-binder-asphalt-concrete-samples.dto';
import { CommonQueryFilter } from 'utils/queryFilter';

@ApiTags('samples')
@Controller('promedina/binder-asphalt-concrete/binder-asphalt-concrete-samples')
export class BinderAsphaltConcreteSamplesController {
  private logger = new Logger(BinderAsphaltConcreteSamplesController.name);

  constructor(private readonly binderAsphaltConcreteSamplesService: BinderAsphaltConcreteSamplesService) {}

  @Post('save')
  @ApiOperation({ summary: 'Cria uma amostra de ligante asfáltico/concreto no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Amostra de ligante asfáltico/concreto criada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar amostra de ligante asfáltico/concreto!' })
  async createSample(@Body() sample: CreateBinderAsphaltConcreteSampleDto) {
    this.logger.log('create binder/concrete sample > [body]');
    try {
      const createdSample = await this.binderAsphaltConcreteSamplesService.createSample(sample);

      if (createdSample) {
        this.logger.log(`Binder/concrete sample created > [id]: ${createdSample._id}`);

        return createdSample;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        const response = error.getResponse();
        return { success: false, error: { name: 'SampleCreationError', message: response['error'] } };
      }

      this.logger.error(`Error on create sample > [error]: ${error}`);
      throw error;
    }
  }

  @Get('/filter')
  @ApiOperation({ summary: 'Retorna amostras filtradas de ligantes asfálticos/concreto do banco de dados.' })
  @ApiResponse({ status: 201, description: 'Amostras filtradas de ligantes asfálticos/concreto criadas com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar amostra de ligantes asfálticos/concreto!' })
  async getSamplesByFilter(@Query() queryFilter: CommonQueryFilter) {
    this.logger.log(`get samples by filter > [filter]: ${queryFilter}`);

    return this.binderAsphaltConcreteSamplesService.getSamplesByFilter(queryFilter);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retorna todas as amostras de ligante asfáltico/concreto do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostras de ligante asfáltico/concreto encontradas com sucesso!' })
  async getAll() {
    this.logger.log(`get all samples`);

    return this.binderAsphaltConcreteSamplesService.getAllSamples();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma amostra de ligante asfáltico/concreto do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de ligante asfáltico/concreto encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de ligante asfáltico/concreto não encontrada!' })
  async getSampleById(@Param('id') sampleId: string) {
    this.logger.log(`get sample by id > [id]: ${sampleId}`);

    return this.binderAsphaltConcreteSamplesService.getSample(sampleId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma amostra de ligante asfáltico/concreto do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de ligante asfáltico/concreto atualizada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de ligante asfáltico/concreto não encontrada!' })
  async updateSampleById(@Param('id') sampleId: string, @Body() sample: BinderAsphaltConcrete_Sample) {
    this.logger.log(`update sample by id > [id]: ${sampleId}`);

    return this.binderAsphaltConcreteSamplesService.updateSample(sample);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma amostra de ligante asfáltico/concreto do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra de ligante asfáltico/concreto deletada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra de ligante asfáltico/concreto não encontrada!' })
  async deleteSampleById(@Param('id') sampleId: string) {
    this.logger.log(`delete sample by id > [id]: ${sampleId}`);

    return this.binderAsphaltConcreteSamplesService.deleteSample(sampleId);
  }
}

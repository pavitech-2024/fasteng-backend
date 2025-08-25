import { Body, Controller, Get, Logger, Param, Post, Delete, Put } from '@nestjs/common';
import { SamplesService } from '../service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { UpateSampleDto } from '../dto/create-sample.dto';
import { Sample } from '../schemas';
import { User } from '../../../../config/decorators/user.decorator';
import { CreateSampleDto } from '../dto/create-sample.dto';

@ApiTags('samples')
@Controller('soils/samples')
export class SamplesController {
  private logger = new Logger(SamplesController.name);

  constructor(private readonly samplesService: SamplesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma amostra no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Amostra criada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar amostra!' })
  @ApiBody({ type: CreateSampleDto })
  async createSample(@Body() sample: CreateSampleDto, @User('userId') userId: string) {
    this.logger.log('create sample > [body]');
    const createdSample = await this.samplesService.createSample(sample);

    if (createdSample) this.logger.log(`sample created > [id]: ${createdSample._id}`);

    return createdSample;
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as amostras do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Amostras encontradas com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all samples by user id > [id]: ${userId}`);

    const samples = await this.samplesService.getAllSamplesByUserId(userId);

    return samples
  }
  
  
  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma amostra do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra não encontrada!' })
  async getSampleById(@Param('id') sampleId: string) {
    this.logger.log(`get sample by id > [id]: ${sampleId}`);

    return this.samplesService.getSample(sampleId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma amostra do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra atualizada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra não encontrada!' })
  @ApiBody({ type: CreateSampleDto })
  async updateSampleById(@Param('id') sampleId: string, @Body() sample: Sample) {
    this.logger.log(`update sample by id > [id]: ${sampleId}`);

    return this.samplesService.updateSample(sample);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma amostra do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Amostra deletada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Amostra não encontrada!' })
  async deleteSampleById(@Param('id') sampleId: string) {
    this.logger.log(`delete sample by id > [id]: ${sampleId}`);

    return this.samplesService.deleteSample(sampleId);
  }
}

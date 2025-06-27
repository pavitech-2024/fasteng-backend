import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Logger, 
  Param, 
  Post, 
  NotFoundException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarshallService } from '../service';
import { MarshallInitDto } from '../dto/marshall-init.dto';

@ApiTags('marshall')
@Controller('asphalt/dosages/marshall')
export class MarshallController {
  private readonly logger = new Logger(MarshallController.name);

  constructor(private readonly marshallService: MarshallService) {}

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as dosagens Marshall do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Dosagens encontradas com sucesso!' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`Buscando todas dosagens para usuário id: ${userId}`);
    try {
      const dosages = await this.marshallService.getAllDosages(userId);
      if (!dosages || dosages.length === 0) {
        throw new NotFoundException('Nenhuma dosagem encontrada para este usuário.');
      }
      return dosages;
    } catch (error) {
      this.logger.error(`Erro ao buscar dosagens do usuário ${userId}`, error.stack);
      throw new NotFoundException('Usuário não encontrado.');
    }
  }

  @Post('verify-init/:id')
  @ApiOperation({ summary: 'Verifica se é possível criar uma dosagem Marshall com os dados enviados.' })
  @ApiResponse({ status: 200, description: 'Resultado da verificação da criação da dosagem.' })
  @ApiResponse({ status: 400, description: 'Erro na verificação.' })
  async verifyInitMarshall(@Body() body: MarshallInitDto, @Param('id') userId: string) {
    this.logger.log(`Verificando criação de dosagem Marshall para usuário id: ${userId}`);
    try {
      return await this.marshallService.verifyInitMarshall(body, userId);
    } catch (error) {
      this.logger.error('Erro ao verificar criação de dosagem Marshall', error.stack);
      throw new InternalServerErrorException('Erro interno ao verificar dosagem.');
    }
  }

  @Get('material-selection/:id')
  @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.' })
  @ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado!' })
  async getMaterialsByUserId(@Param('id') userId: string) {
    this.logger.log(`Buscando materiais para usuário id: ${userId}`);
    try {
      const materials = await this.marshallService.getUserMaterials(userId);
      if (!materials) {
        throw new NotFoundException('Materiais não encontrados para este usuário.');
      }
      return materials;
    } catch (error) {
      this.logger.error(`Erro ao buscar materiais do usuário ${userId}`, error.stack);
      throw new NotFoundException('Usuário não encontrado.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma dosagem do banco de dados com o id informado.' })
  @ApiResponse({ status: 200, description: 'Dosagem encontrada com sucesso!' })
  @ApiResponse({ status: 404, description: 'Dosagem não encontrada!' })
  async getDosageById(@Param('id') dosageId: string) {
    this.logger.log(`Buscando dosagem por id: ${dosageId}`);
    try {
      const dosage = await this.marshallService.getDosageById(dosageId);
      if (!dosage) {
        throw new NotFoundException('Dosagem não encontrada.');
      }
      return dosage;
    } catch (error) {
      this.logger.error(`Erro ao buscar dosagem id ${dosageId}`, error.stack);
      throw new NotFoundException('Dosagem não encontrada.');
    }
  }

  @Post('save-material-selection-step/:id')
  async saveMaterialSelectionStep(@Body() body: any, @Param('id') userId: string) {
    this.logger.log(`Salvando etapa seleção materiais para usuário id: ${userId}`);
    return this.marshallService.saveMaterialSelectionStep(body, userId);
  }

  @Post('step-3-data')
  @ApiOperation({ summary: 'Retorna os dados iniciais necessários para a terceira tela (composição granulométrica) da dosagem' })
  async getStep3Data(@Body() body: any) {
    this.logger.log(`Carregando dados da etapa 3`);
    return this.marshallService.getStep3Data(body);
  }

  @Post('calculate-step-3-data')
  async calculateStep3Data(@Body() body: any) {
    this.logger.log(`Calculando dados da etapa 3`);
    return this.marshallService.calculateStep3Data(body);
  }

  @Post('save-granulometry-composition-step/:userId')
  async saveGranulometryCompositionStep(@Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`Salvando dados da composição granulométrica para usuário id: ${userId}`);
    return this.marshallService.saveStep3Data(body, userId);
  }

  @Post('calculate-step-4-data')
  async calculateStep4Data(@Body() body: any) {
    this.logger.log(`Calculando dados da etapa 4`);
    return this.marshallService.calculateStep4Data(body);
  }

  @Post('save-binder-trial-step/:userId')
  async saveBinderTrialStep(@Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`Salvando dados da etapa 4 para usuário id: ${userId}`);
    return this.marshallService.saveStep4Data(body, userId);
  }

  @Post('get-specific-mass-indexes')
  async getIndexesOfMissesSpecificGravity(@Body() aggregates: any) {
    this.logger.log(`Buscando índices de massa específica - etapa 5`);
    return this.marshallService.getIndexesOfMissesSpecificGravity(aggregates);
  }

  @Post('calculate-step-5-dmt-data')
  async calculateDmtData(@Body() body: any) {
    this.logger.log(`Calculando dados DMT - etapa 5`);
    return this.marshallService.calculateDmtData(body);
  }

  @Post('calculate-step-5-gmm-data')
  async calculateGmmData(@Body() body: any) {
    this.logger.log(`Calculando dados GMM - etapa 5`);
    return this.marshallService.calculateGmmData(body);
  }

  @Post('calculate-step-5-rice-test')
  async calculateRiceTest(@Body() body: any) {
    this.logger.log(`Calculando teste Rice - etapa 5`);
    return this.marshallService.calculateRiceTest(body.riceTest);
  }

  @Post('save-maximum-mixture-density-step/:userId')
  async saveMaximumMixtureDensityData(@Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`Salvando dados máxima densidade da mistura para usuário id: ${userId}`);
    return this.marshallService.saveStep5Data(body, userId);
  }

  @Post('set-step-6-volumetric-parameters')
  async setVolumetricParameters(@Body() body: any) {
    this.logger.log(`Definindo parâmetros volumétricos - etapa 6`);
    return this.marshallService.setVolumetricParameters(body);
  }

  @Post('save-volumetric-parameters-step/:userId')
  async saveVolumetricParametersData(@Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`Salvando parâmetros volumétricos para usuário id: ${userId}`);
    return this.marshallService.saveStep6Data(body, userId);
  }

  @Post('set-step-7-optimum-binder')
  async setOptimumBinderContentData(@Body() body: any) {
    this.logger.log(`Definindo conteúdo ótimo do ligante - etapa 7`);
    return this.marshallService.setOptimumBinderContentData(body);
  }

  @Post('step-7-plot-dosage-graph')
  async setOptimumBinderContentDosageGraph(@Body() body: any) {
    this.logger.log(`Gerando gráfico da dosagem do ligante - etapa 7`);
    return this.marshallService.setOptimumBinderContentDosageGraph(body);
  }

  @Post('step-7-get-expected-parameters')
  async getOptimumBinderExpectedParameters(@Body() body: any) {
    this.logger.log(`Buscando parâmetros esperados do ligante - etapa 7`);
    return this.marshallService.getOptimumBinderExpectedParameters(body);
  }

  @Post('save-optimum-binder-content-step/:userId')
  async saveOptimumBinderContentData(@Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`Salvando dados do ligante ótimo para usuário id: ${userId}`);
    return this.marshallService.saveStep7Data(body, userId);
  }

  @Post('confirm-specific-gravity')
  async confirmSpecificGravity(@Body() body: any) {
    this.logger.log(`Confirmando gravidade específica - etapa 8`);
    return this.marshallService.confirmSpecificGravity(body);
  }

  @Post('confirm-volumetric-parameters')
  async confirmVolumetricParameters(@Body() body: any) {
    this.logger.log(`Confirmando parâmetros volumétricos - etapa 8`);
    return this.marshallService.confirmVolumetricParameters(body);
  }

  @Post('save-confirmation-compression-data-step/:userId')
  async saveConfirmationCompressionData(@Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`Salvando dados de compressão confirmada para usuário id: ${userId}`);
    return this.marshallService.saveStep8Data(body, userId);
  }

  @Post('save-marshall-dosage/:userId')
  async saveMarshallDosage(@Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`Salvando dosagem Marshall para usuário id: ${userId}`);
    return this.marshallService.saveMarshallDosage(body, userId);
  }

  @Delete(':id')
  async deleteMarshallDosage(@Param('id') id: string) {
    this.logger.log(`Deletando dosagem Marshall id: ${id}`);
    return this.marshallService.deleteMarshallDosage(id);
  }
}

import { Body, Controller, Delete, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MarshallService } from '../service';
import { MarshallGeneralDataDTO } from '../dto/marshal-general-data.dto';
import { SaveMarshallDosageDTO } from '../dto/binder-trial-data.dto';
import { CalculateDmtDataDTO } from '../dto/calculate-dmt-data.dto';
import { CalculateGmmDataDTO } from '../dto/calculate-gmm-data.dto';
import { RiceTestDTO } from '../dto/confirmation-compresion-data.dto';
import { AggregateDTO } from '../dto/marshal-material-data.dto';
import { SaveStepDTO } from '../dto/save-step.dto';
import { GetIndexesOfMissesSpecificGravityDTO } from '../dto/get-indexes-of-misses-specific-gravity.dto';
import {
  SaveStep3DTO,
  SaveStep4DTO, 
  SaveStep5DTO,
  SaveStep6DTO,
  SaveStep7DTO,
  SaveStep8DTO
} from '../dto/save-step.dto';
import { MarshallStep3Dto } from '../dto/step-3-marshall.dto';
import { CalculateStep3DTO } from '../dto/calculate-step-5.dto';
import { Step3Result } from '../types/step-data.type';
import { CalculateRiceTestDTO as CalculateRiceTestDTONew } from '../dto/calculate-rice-test.dto';
import { SaveMaximumMixtureDensityDataDTO } from '../dto/save-maximum-mixture-density-data.dto';
//test
//import { Types } from 'mongoose';

@ApiTags('marshall')
@Controller('asphalt/dosages/marshall')
export class MarshallController {
  private logger = new Logger(MarshallController.name);

  constructor(private readonly marshallService: MarshallService) {}

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as dosagens Marshall de um usuário.' })
  @ApiResponse({ status: 200, description: 'Dosagens encontradas com sucesso!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all dosages by user id > [id]: ${userId}`);
    return this.marshallService.getAllDosages(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma dosagem do banco de dados com o id informado.' })
  @ApiResponse({ status: 200, description: 'Dosagem encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Dosagem não encontrada!' })
  async getDosageById(@Res() response: Response, @Param('id') dosageId: string) {
    this.logger.log(`get dosage by id > [id]: ${dosageId}`);

    const status = await this.marshallService.getDosageById(dosageId);
    return response.status(200).json(status);
  }
  //testado com dado mockado, check in!
  @Post('verify-init/:id')
  @ApiOperation({ summary: 'Verifica se é possível criar uma dosagem Marshall.' })
  @ApiResponse({
    status: 200,
    description: 'Status da verificação.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  async verifyInitMarshall(
    @Res() response: Response,
    @Body() body: MarshallGeneralDataDTO,
    @Param('id') userId: string,
  ) {
    this.logger.log('verify init Marshall > [body]');
    const status = await this.marshallService.verifyInitMarshall(body, userId);
    return response.status(200).json(status);
  }

 @Post('get-specific-mass-indexes')
  @ApiOperation({ summary: 'Retorna índices de massa específica faltante (DMT).' })
  @ApiResponse({ status: 200, description: 'Índices calculados com sucesso.' })
  async getIndexesOfMissesSpecificGravity(
    @Res() response: Response,
    @Body() aggregates: GetIndexesOfMissesSpecificGravityDTO 
  ) {
    this.logger.log(`get specific mass indexes > [body]: ${JSON.stringify(aggregates)}`);
    const status = await this.marshallService.getIndexesOfMissesSpecificGravity(aggregates);
    return response.status(200).json(status);
  }

   @Post('calculate-step-5-dmt-data')
  @ApiOperation({ summary: 'Calcula dados DMT da dosagem.' })
  @ApiResponse({ status: 200, description: 'Dados DMT calculados com sucesso.' })
  async calculateDmtData(
    @Res() response: Response,
    @Body() body: CalculateDmtDataDTO
  ) {
    this.logger.log(`calculate step 5 dmt data > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.calculateDmtData(body);
    return response.status(200).json(status);
  }


  @Post('calculate-step-5-gmm-data')
  @ApiOperation({ summary: 'Calcula dados GMM da dosagem.' })
  @ApiResponse({ status: 200, description: 'Dados GMM calculados com sucesso.' })
  async calculateGmmData(
    @Res() response: Response,
    @Body() body: CalculateGmmDataDTO
  ) {
    this.logger.log(`calculate step 5 gmm data > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.calculateGmmData(body);
    return response.status(200).json(status);
  }

   @Post('calculate-step-5-rice-test')
  @ApiOperation({ summary: 'Calcula Rice Test da dosagem.' })
  @ApiResponse({ status: 200, description: 'Rice Test calculado com sucesso.' })
  async calculateRiceTest(
    @Res() response: Response,
    @Body() body: CalculateRiceTestDTONew // DTO atualizado
  ) {
    this.logger.log(`calculate maximum mixture density rice test > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.calculateRiceTest(body);
    return response.status(200).json(status);
  }

  @Post('save-marshall-dosage/:userId')
  @ApiOperation({ summary: 'Salva dosagem Marshall.' })
  @ApiResponse({ status: 200, description: 'Dosagem salva com sucesso.' })
  async saveMarshallDosage(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: SaveMarshallDosageDTO,
  ) {
    this.logger.log(`save marshall dosage > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.saveMarshallDosage(body, userId);
    return response.status(200).json(status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta dosagem Marshall pelo ID.' })
  @ApiResponse({ status: 200, description: 'Dosagem deletada com sucesso.' })
  async deleteMarshallDosage(@Res() response: Response, @Param('id') id: string) {
    this.logger.log(`delete marshall dosage > [id]: ${id}`);
    const status = await this.marshallService.deleteMarshallDosage(id);
    return response.status(200).json(status);
  }

  
  
  // --- Rotas restantes com any, ainda falta bastnt

  @Post('step-3-data')//Essa em especifico, testar
  @ApiOperation({ summary: 'Retorna os dados iniciais da terceira tela (composição granulométrica).' })
  @ApiResponse({ status: 200, description: 'Dados carregados com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados não encontrados.' })
  async getStep3Data(@Res() response: Response, @Body() body: MarshallStep3Dto) {
    this.logger.log(`get step 3 data > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.getStep3Data(body);
    return response.status(200).json(status);
  }

 @Post('calculate-step-3-data')
@ApiOperation({ summary: 'Calcula dados da terceira tela (composição granulométrica).' })
async calculateStep3Data(
  @Res() response: Response,
  @Body() body: CalculateStep3DTO, 
): Promise<Response<Step3Result>> {  
  this.logger.log(`calculate step 3 data > [body]: ${JSON.stringify(body)}`);
  const status: Step3Result = await this.marshallService.calculateStep3Data(body);
  return response.status(200).json(status);
}

 @Post('save-granulometry-composition-step/:userId')
@ApiOperation({ summary: 'Salva dados da composição granulométrica (step 3).' })
async saveGranulometryCompositionStep(
  @Res() response: Response, 
  @Param('userId') userId: string, 
  @Body() body: SaveStep3DTO // DTO específico
) {
  this.logger.log(`save step 3 data > [body]: ${JSON.stringify(body)}`);
  const status = await this.marshallService.saveStep3Data(body, userId);
  return response.status(200).json(status);
}

  @Post('calculate-step-4-data')
  @ApiOperation({ summary: 'Calcula dados do step 4 (binder trial).' })
  async calculateStep4Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 4 data > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.calculateStep4Data(body);
    return response.status(200).json(status);
  }

 @Post('save-binder-trial-step/:userId')
@ApiOperation({ summary: 'Salva dados do binder trial (step 4).' })
async saveBinderTrialStep(
  @Res() response: Response, 
  @Param('userId') userId: string, 
  @Body() body: SaveStep4DTO
) {
  this.logger.log(`save step 4 data > [body]: ${JSON.stringify(body)}`);
  const status = await this.marshallService.saveStep4Data(body, userId);
  return response.status(200).json(status);
}

  @Post('save-maximum-mixture-density-step/:userId')
  @ApiOperation({ summary: 'Salva dados do máximo de densidade da mistura (step 5).' })
  @ApiResponse({ status: 200, description: 'Dados salvos com sucesso.' })
  async saveMaximumMixtureDensityData(
    @Res() response: Response, 
    @Param('userId') userId: string, 
    @Body() body: SaveMaximumMixtureDensityDataDTO // DTO atualizado
  ) {
    this.logger.log(`save maximum mixture density data > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.saveMistureMaximumDensityData(body, userId);
    return response.status(200).json(status);
  }

  @Post('set-step-6-volumetric-parameters')
  @ApiOperation({ summary: 'Define parâmetros volumétricos (step 6).' })
  async setVolumetricParameters(@Res() response: Response, @Body() body: any) {
    this.logger.log(`set step 6 volumetric parameters > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.setVolumetricParameters(body);
    return response.status(200).json(status);
  }

  @Post('save-volumetric-parameters-step/:userId')
  @ApiOperation({ summary: 'Salva parâmetros volumétricos (step 6).' })
  async saveVolumetricParametersData(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save volumetric parameters data > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.saveVolumetricParametersData(body, userId);
    return response.status(200).json(status);
  }

  @Post('set-step-7-optimum-binder')
  @ApiOperation({ summary: 'Define conteúdo ótimo de ligante (step 7).' })
  async setOptimumBinderContentData(@Res() response: Response, @Body() body: any) {
    this.logger.log(`set step 7 optimum binder content > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.setOptimumBinderContentData(body);
    return response.status(200).json(status);
  }

  @Post('step-7-plot-dosage-graph')
  @ApiOperation({ summary: 'Gera gráfico da dosagem do ligante ótimo (step 7).' })
  async setOptimumBinderContentDosageGraph(@Res() response: Response, @Body() body: any) {
    this.logger.log(`step 7 dosage graph > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.setOptimumBinderContentDosageGraph(body);
    return response.status(200).json(status);
  }

  @Post('step-7-get-expected-parameters')
  @ApiOperation({ summary: 'Retorna parâmetros esperados do ligante ótimo (step 7).' })
  async getOptimumBinderExpectedParameters(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get step 7 optimum binder expected parameters > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.getOptimumBinderExpectedParameters(body);
    return response.status(200).json(status);
  }

 @Post('save-optimum-binder-content-step/:userId')
@ApiOperation({ summary: 'Salva conteúdo ótimo de ligante (step 7).' })
async saveOptimumBinderContentData(
  @Res() response: Response, 
  @Param('userId') userId: string, 
  @Body() body: SaveStep7DTO // DTO específico
) {
  this.logger.log(`save step 7 data > [body]: ${JSON.stringify(body)}`);
  const status = await this.marshallService.saveStep7Data(body, userId);
  return response.status(200).json(status);
}

  @Post('confirm-specific-gravity')
  @ApiOperation({ summary: 'Confirma gravidade específica (step 8).' })
  async confirmSpecificGravity(@Res() response: Response, @Body() body: any) {
    this.logger.log(`confirm step 8 specific gravity > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.confirmSpecificGravity(body);
    return response.status(200).json(status);
  }

  @Post('confirm-volumetric-parameters')
  @ApiOperation({ summary: 'Confirma parâmetros volumétricos (step 8).' })
  async confirmVolumetricParameters(@Res() response: Response, @Body() body: any) {
    this.logger.log(`confirm step 8 volumetric parameters > [body]: ${JSON.stringify(body)}`);
    const status = await this.marshallService.confirmVolumetricParameters(body);
    return response.status(200).json(status);
  }

@Post('save-confirmation-compression-data-step/:userId')
@ApiOperation({ summary: 'Salva dados de compressão confirmada (step 8).' })
async saveConfirmationCompressionData(
  @Res() response: Response, 
  @Param('userId') userId: string, 
  @Body() body: SaveStep8DTO 
) {
  this.logger.log(`save step 8 data > [body]: ${JSON.stringify(body)}`);
  const status = await this.marshallService.saveStep8Data(body, userId);
  return response.status(200).json(status);
}


//Rota teste p função generica;
@Post('save-step')
@ApiOperation({ summary: 'Salva dados de qualquer step (genérico).' })
async saveStepData(
  @Res() response: Response,
  @Body() body: SaveStepDTO
) {
  this.logger.log(`save step data > [body]: ${JSON.stringify(body)}`);
  const status = await this.marshallService.saveStepData(body);
  return response.status(200).json(status);
}

/*
  @Post('create-test-dosage')
  async createTestDosage(@Res() response: Response) {
    try {
      // 1️⃣ Cria um userId fake
      const fakeUserId = new Types.ObjectId().toHexString();

      // 2️⃣ Gera um ObjectId para a dosagem fake
      const dosageId = new Types.ObjectId().toHexString();

      // 3️⃣ Define os dados da dosagem
      const dosageBody = {
        _id: dosageId,
        generalData: {
          name: 'Dosagem Teste Fake',
          objective: 'teste',
          dnitBand: 'B',
          description: 'Dosagem criada para teste'
        },
        // Adicione outros campos necessários aqui
      };

      // 4️⃣ Salva a dosagem pelo service
      const saveResult = await this.marshallService.saveMarshallDosage(dosageBody, fakeUserId);

      if (!saveResult.success) {
        return response.status(500).json(saveResult);
      }

      // 5️⃣ Retorna os IDs para testes
      return response.status(200).json({
        success: true,
        dosageId,
        userId: fakeUserId
      });
    } catch (error) {
      this.logger.error(`Error creating test dosage > ${error}`);
      return response.status(500).json({
        success: false,
        error: {
          message: error.message,
          name: error.name
        }
      });
    }
  }
*/

}

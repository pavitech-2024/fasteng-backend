import { Body, Controller, Delete, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
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
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
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
import { SaveVolumetricParametersRequestDTO,SaveVolumetricParametersResponseDTO } from '../dto/volumetric-params-data.dto';

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
@ApiOperation({ summary: 'Retorna uma dosagem com base no ID informado.' })
@ApiResponse({ status: 200, description: 'Dosagem encontrada com sucesso!' })
@ApiResponse({ status: 404, description: 'Dosagem não encontrada.' })
@ApiParam({ name: 'id', type: String, description: 'ID da dosagem' })
async getDosageById(@Param('id') dosageId: string) {
  this.logger.log(`Buscando dosagem pelo ID: ${dosageId}`);

  const dosage = await this.marshallService.getDosageById(dosageId);

  if (!dosage) {
    throw new NotFoundException('Dosagem não encontrada');
  }

  return dosage;
}

  //testado com dado mockado, check in!
@Post('verify-init/:id')
@ApiOperation({ summary: 'Verifica se é possível criar uma dosagem Marshall.' })
@ApiResponse({
  status: 200,
  description: 'Status da verificação.',
  content: { 'application/json': { schema: { example: { success: true } } } },
})
@ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
async verifyInitMarshall(
  @Body() body: MarshallGeneralDataDTO,
  @Param('id') userId: string,
) {
  this.logger.log(`Verificando init Marshall para userId: ${userId}`);
  const status = await this.marshallService.verifyInitMarshall(body, userId);
  return status; 
}


@Post('get-specific-mass-indexes')
@ApiOperation({ summary: 'Retorna índices de massa específica faltante (DMT).' })
@ApiResponse({ status: 200, description: 'Índices calculados com sucesso.' })
async getIndexesOfMissesSpecificGravity(
  @Body() aggregates: GetIndexesOfMissesSpecificGravityDTO,
) {
  this.logger.log(`get specific mass indexes > [body]: ${JSON.stringify(aggregates)}`);
  
  const status = await this.marshallService.getIndexesOfMissesSpecificGravity(aggregates);
  return status; 
}


  @Post('calculate-step-5-dmt-data')
@ApiOperation({ summary: 'Calcula dados DMT da dosagem.' })
@ApiResponse({ status: 200, description: 'Dados DMT calculados com sucesso.' })
async calculateDmtData(
  @Body() body: CalculateDmtDataDTO
) {
  this.logger.log(`calculate step 5 dmt data > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.calculateDmtData(body);
  return result; 
}



@Post('calculate-step-5-gmm-data')
@ApiOperation({ summary: 'Calcula dados GMM da dosagem.' })
@ApiResponse({ status: 200, description: 'Dados GMM calculados com sucesso.' })
async calculateGmmData(
  @Body() body: CalculateGmmDataDTO
) {
  this.logger.log(`calculate step 5 gmm data > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.calculateGmmData(body);
  return result; 
}


   @Post('calculate-step-5-rice-test')
@ApiOperation({ summary: 'Calcula Rice Test da dosagem.' })
@ApiResponse({ status: 200, description: 'Rice Test calculado com sucesso.' })
async calculateRiceTest(
  @Body() body: CalculateRiceTestDTONew
) {
  this.logger.log(`calculate maximum mixture density rice test > [body]: ${JSON.stringify(body)}`);
  
  const result = await this.marshallService.calculateRiceTest(body);
  return result;
}


 @Post('save-marshall-dosage/:userId')
@ApiOperation({ summary: 'Salva dosagem Marshall.' })
@ApiResponse({ status: 200, description: 'Dosagem salva com sucesso.' })
@ApiParam({ name: 'userId', type: String, description: 'ID do usuário' })
async saveMarshallDosage(
  @Param('userId') userId: string,
  @Body() body: SaveMarshallDosageDTO,
) {
  this.logger.log(`save marshall dosage > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.saveMarshallDosage(body, userId);
  return result; // NestJS cuida da resposta
}


 @Delete(':id')
@ApiOperation({ summary: 'Deleta dosagem Marshall pelo ID.' })
@ApiResponse({ status: 200, description: 'Dosagem deletada com sucesso.' })
@ApiParam({ name: 'id', type: String, description: 'ID da dosagem a ser deletada' })
async deleteMarshallDosage(@Param('id') id: string) {
  this.logger.log(`delete marshall dosage > [id]: ${id}`);

  const result = await this.marshallService.deleteMarshallDosage(id);
  return result; 
}


  
  
  

 @Post('step-3-data')
@ApiOperation({ summary: 'Retorna os dados iniciais da terceira tela (composição granulométrica).' })
@ApiResponse({ status: 200, description: 'Dados carregados com sucesso.' })
@ApiResponse({ status: 400, description: 'Dados não encontrados.' })
async getStep3Data(@Body() body: MarshallStep3Dto) {
  this.logger.log(`get step 3 data > [body]: ${JSON.stringify(body)}`);

  const data = await this.marshallService.getStep3Data(body);

  if (!data) {
    throw new BadRequestException('Dados não encontrados.');
  }

  return data; 
}


@Post('calculate-step-3-data')
@ApiOperation({ summary: 'Calcula dados da terceira tela (composição granulométrica).' })
async calculateStep3Data(
  @Body() body: CalculateStep3DTO,
): Promise<Step3Result> {
  this.logger.log(`calculate step 3 data > [body]: ${JSON.stringify(body)}`);

  const result: Step3Result = await this.marshallService.calculateStep3Data(body);
  return result; 
}


@Post('save-granulometry-composition-step/:userId')
@ApiOperation({ summary: 'Salva dados da composição granulométrica (step 3).' })
async saveGranulometryCompositionStep(
  @Param('userId') userId: string,
  @Body() body: SaveStep3DTO
) {
  this.logger.log(`save step 3 data > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.saveStep3Data(body, userId);
  return result; 
}

// --- Rotas restantes com any, ainda falta bastnt
@Post('calculate-step-4-data')
@ApiOperation({ summary: 'Calcula dados do step 4 (binder trial).' })
async calculateStep4Data(@Body() body: any) {
  this.logger.log(`calculate step 4 data > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.calculateStep4Data(body);
  return result; // Nest cuida da resposta HTTP (status 200 + JSON)
}


@Post('save-binder-trial-step/:userId')
@ApiOperation({ summary: 'Salva dados do binder trial (step 4).' })
async saveBinderTrialStep(
  @Param('userId') userId: string,
  @Body() body: SaveStep4DTO
) {
  this.logger.log(`save step 4 data > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.saveStep4Data(body, userId);
  return result; 
}


@Post('save-maximum-mixture-density-step/:userId')
@ApiOperation({ summary: 'Salva dados do máximo de densidade da mistura (step 5).' })
@ApiResponse({ status: 200, description: 'Dados salvos com sucesso.' })
async saveMaximumMixtureDensityData(
  @Param('userId') userId: string,
  @Body() body: SaveMaximumMixtureDensityDataDTO
) {
  this.logger.log(`save maximum mixture density data > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.saveMistureMaximumDensityData(body, userId);
  return result; 
}


@Post('set-step-6-volumetric-parameters')
@ApiOperation({ summary: 'Define parâmetros volumétricos (step 6).' })
async setVolumetricParameters(@Body() body: any) {
  this.logger.log(`set step 6 volumetric parameters > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.setVolumetricParameters(body);
  return result; 
}

  
//Sem tipagem muito explicita p deixar o typescript inferir no que deve.
@Post('save-volumetric-parameters-step/:userId')
@ApiOperation({ summary: 'Salva parâmetros volumétricos (step 6).' })
async saveVolumetricParametersData(
  @Param('userId') userId: string,
  @Body() body: SaveVolumetricParametersRequestDTO
) {
  this.logger.log(`save volumetric parameters data > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.saveVolumetricParametersData(body, userId);
  return result; 
}

@Post('set-step-7-optimum-binder')
@ApiOperation({ summary: 'Define conteúdo ótimo de ligante (step 7).' })
async setOptimumBinderContentData(@Body() body: any) {
  this.logger.log(`set step 7 optimum binder content > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.setOptimumBinderContentData(body);
  return result; 
}

@Post('step-7-plot-dosage-graph')
@ApiOperation({ summary: 'Gera gráfico da dosagem do ligante ótimo (step 7).' })
async setOptimumBinderContentDosageGraph(@Body() body: any) {
  this.logger.log(`step 7 dosage graph > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.setOptimumBinderContentDosageGraph(body);
  return result; 
}

@Post('step-7-get-expected-parameters')
@ApiOperation({ summary: 'Retorna parâmetros esperados do ligante ótimo (step 7).' })
async getOptimumBinderExpectedParameters(@Body() body: any) {
  this.logger.log(`get step 7 optimum binder expected parameters > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.getOptimumBinderExpectedParameters(body);
  return result; 
}

@Post('save-optimum-binder-content-step/:userId')
@ApiOperation({ summary: 'Salva conteúdo ótimo de ligante (step 7).' })
async saveOptimumBinderContentData(
  @Param('userId') userId: string,
  @Body() body: SaveStep7DTO // DTO específico
) {
  this.logger.log(`save step 7 data > [body]: ${JSON.stringify(body)}`);
  
  const result = await this.marshallService.saveStep7Data(body, userId);
  return result; 
}

@Post('confirm-specific-gravity')
@ApiOperation({ summary: 'Confirma gravidade específica (step 8).' })
async confirmSpecificGravity(@Body() body: any) {
  this.logger.log(`confirm step 8 specific gravity > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.confirmSpecificGravity(body);
  return result; 
}
@Post('confirm-volumetric-parameters')
@ApiOperation({ summary: 'Confirma parâmetros volumétricos (step 8).' })
async confirmVolumetricParameters(@Body() body: any) {
  this.logger.log(`confirm step 8 volumetric parameters > [body]: ${JSON.stringify(body)}`);

  const result = await this.marshallService.confirmVolumetricParameters(body);
  return result;
}

@Post('save-confirmation-compression-data-step/:userId')
@ApiOperation({ summary: 'Salva dados de compressão confirmada (step 8).' })
async saveConfirmationCompressionData(
  @Param('userId') userId: string,
  @Body() body: SaveStep8DTO
) {
  this.logger.log(`save step 8 data > [body]: ${JSON.stringify(body)}`);
  
  const result = await this.marshallService.saveStep8Data(body, userId);
  return result; 
}



//Rota teste p função generica;
@Post('save-step')
@ApiOperation({ summary: 'Salva dados de qualquer step (genérico).' })
async saveStepData(@Body() body: SaveStepDTO) {
  this.logger.log(`save step data > [body]: ${JSON.stringify(body)}`);
  
  const result = await this.marshallService.saveStepData(body);
  return result; 
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

import { Body, Controller, Delete, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SuperpaveService } from '../service';
import { SuperpaveInitDto } from '../dto/superpave-init.dto';

@ApiTags('superpave')
@Controller('asphalt/dosages/superpave')
export class SuperpaveController {
  private logger = new Logger(SuperpaveController.name);

  constructor(private readonly superpaveService: SuperpaveService) {}

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as dosagens do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Dosagens encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all dosages by user id > [id]: ${userId}`);

    return this.superpaveService.getAllDosages(userId);
  }

  @Post('verify-init/:id')
  @ApiOperation({ summary: 'Verifica se é possível criar uma Superpave com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma Superpave com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma Superpave com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar uma Superpave com os dados enviados.',
  })
  async verifyInitSuperpave(@Res() response: Response, @Body() body: SuperpaveInitDto, @Param('id') userId: string) {
    this.logger.log('verify init Superpave > [body]');

    const status = await this.superpaveService.verifyInitSuperpave(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-granulometry-essay-data')
  @ApiOperation({ summary: 'Calcula os ensaios de granulometria.' })
  @ApiResponse({
    status: 200,
    description: 'Ensaios de granulometria calculados com sucesso!',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao calcular os ensaios de granulometria.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
      },
    },
  })
  async calculateGranulometryEssaysData(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate granulometry essays of granulometry essay data step > [body]: ${body}`);

    const status = await this.superpaveService.calculateGranulometryEssayData(body);

    return response.status(200).json(status);
  }

  @Post('save-granulometry-essay-data/:id')
  async saveGranulometryEssayData(@Res() response: Response, @Body() body: any, @Param('id') userId: string) {
    this.logger.log(`save granulometry essay data in user superpave dosage > [body]: ${body}`);

    const status = await this.superpaveService.saveGranulometryEssayData(body, userId);

    return response.status(200).json(status);
  }

  @Post('save-granulometry-essay-results/:id')
  async saveGranulometryEssayResults(@Res() response: Response, @Body() body: any, @Param('id') userId: string) {
    this.logger.log(`save granulometry essay results in user superpave dosage > [body]: ${body}`);

    const status = await this.superpaveService.saveGranulometryEssayResults(body, userId);

    return response.status(200).json(status);
  }

  @Get('material-selection/:id')
  @ApiOperation({
    summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.',
  })
  @ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getMaterialsByUserId(@Res() response: Response, @Param('id') userId: string) {
    this.logger.log(`get all materials, by user id, with the necessary dosage essays > [id]: ${userId}`);

    const status = await this.superpaveService.getUserMaterials(userId);

    return response.status(200).json(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma dosagem do banco de dados com o id informado.' })
  @ApiResponse({ status: 200, description: 'Dosagem encontrada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Dosagem não encontrada!' })
  async getDosageById(@Res() response: Response, @Param('id') dosageId: string) {
    this.logger.log(`get all materials, by user id, with the necessary dosage essays > [id]: ${dosageId}`);
    this.logger.log(`get a dosage by dosage id > [id]: ${dosageId}`);

    const status = await this.superpaveService.getDosageById(dosageId);

    return response.status(200).json(status);
  }

  @Post('save-material-selection-step/:id')
  async saveMaterialSelectionStep(@Res() response: Response, @Body() body: any, @Param('id') userId: string) {
    this.logger.log(`save materials selection step in user superpave dosage > [body]: ${body}`);

    const status = await this.superpaveService.saveMaterialSelectionStep(body, userId);

    return response.status(200).json(status);
  }

  @Post('get-granulometric-composition-data')
  @ApiOperation({
    summary: 'Retorna os dados iniciais necessários para a etapa de composição granulometrica da dosagem',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
  })
  @ApiResponse({ status: 400, description: 'Dados não encontrados!' })
  async getStep3Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get granulometric composition data > [body]: ${body}`);

    const status = await this.superpaveService.getGranulometricCompositionData(body);

    return response.status(200).json(status);
  }

  @Post('calculate-granulometric-composition-data')
  async calculateStep3Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate granulometric composition data > [body]: ${body}`);

    const status = await this.superpaveService.calculateGranulometricCompositionData(body);

    return response.status(200).json(status);
  }

  @Post('save-granulometry-composition-step/:userId')
  async saveGranulometryCompositionStep(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save step 4 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep4Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('get-first-compression-specific-masses')
  @ApiOperation({
    summary: 'Retorna os dados iniciais necessários para a tela de Primeira Compactação da dosagem',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
  })
  async getStep5SpecificMasses(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get first compression specific masses data > [body]: ${body}`);

    const status = await this.superpaveService.getFirstCompressionSpecificMasses(body);

    return response.status(200).json(status);
  }

  @Post('calculate-step-5-data')
  @ApiOperation({ summary: 'Calcula os dados inseridos para a quarta tela (teor de ligante inicial) da dosagem' })
  @ApiResponse({
    status: 200,
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
  })
  @ApiResponse({ status: 400, description: 'Dados não encontrados!' })
  async calculateStep5Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 5 data > [body]: ${body}`);

    const status = await this.superpaveService.calculateStep5Data(body);

    return response.status(200).json(status);
  }

  @Post('save-initial-binder-step/:userId')
  async saveInitialBinderStep(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save step 5 data > [body]: ${body}`);

    const status = await this.superpaveService.saveInitialBinderStep(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-gmm')
  async calculateRiceTest(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate rice test data > [body]: ${body}`);

    const status = await this.superpaveService.calculateGmm(body);

    return response.status(200).json(status);
  }

  @Post('save-first-compression-step/:userId')
  async saveFirstCompressionData(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save first compression data > [body]: ${body}`);

    const status = await this.superpaveService.saveFirstCompressionData(body, userId);

    return response.status(200).json(status);
  }

  @Post('get-first-compression-parameters')
  @ApiOperation({
    summary: 'Retorna os dados iniciais necessários para a tela de parâmetros da primiera compactaão da dosagem',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
  })
  async getFirstCompressionParametersData(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get first compression parameters data > [body]: ${body}`);

    const status = await this.superpaveService.getFirstCompressionParametersData(body);

    return response.status(200).json(status);
  }

  @Post('save-percents-of-chosen-curve-step/:userId')
  async saveStep6Data(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save percents of chosen curve data > [body]: ${body}`);

    const status = await this.superpaveService.savePercentsOfChosenCurveData(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-chosen-curve-percentages')
  @ApiOperation({
    summary: 'Calcula os dados da sétima tela (porcentagens da curva escolhida) da dosagem',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
  })
  async getStep7Parameters(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get step 7 data > [body]: ${body}`);

    const status = await this.superpaveService.getStep7Parameters(body);

    return response.status(200).json(status);
  }

  @Post('save-chosen-curve-percentage-step/:userId')
  async saveStep7Data(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save step 7 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep7Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-step-7-rice-test')
  async calculateStep7RiceTest(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 5 rice test data > [body]: ${body}`);

    const status = await this.superpaveService.calculateStep7RiceTest(body);

    return response.status(200).json(status);
  }

  @Post('calculate-step-7-gmm')
  async calculateStep7Gmm(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 5 gmm data > [body]: ${body}`);

    const status = await this.superpaveService.calculateStep7Gmm(body);

    return response.status(200).json(status);
  }

  @Post('confirm-second-compression-data')
  async calculateSecondCompressionData(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate second compression data > [body]: ${body}`);

    const status = await this.superpaveService.calculateSecondCompressionData(body);

    return response.status(200).json(status);
  }

  @Post('save-second-compression-data-step/:userId')
  async saveSecondCompressionData(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save step 8 data > [body]: ${body}`);

    const status = await this.superpaveService.saveSecondCompressionData(body, userId);

    return response.status(200).json(status);
  }

  @Post('get-second-compression-percentage-data')
  @ApiOperation({
    summary: 'Retorna os dados iniciais necessários para a tela de porcentagens da segunda compactação da dosagem',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
  })
  async getSecondCompressionPercentageData(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get second compression percentage data > [body]: ${body}`);

    const status = await this.superpaveService.getSecondCompressionPercentageData(body);

    return response.status(200).json(status);
  }

  @Post('save-second-compression-params-step/:userId')
  async saveSecondCompressionParams(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save second compression data > [body]: ${body}`);

    const status = await this.superpaveService.saveSecondCompressionParams(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-step-9-rice-test')
  async calculateStep9RiceTest(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate dosage equation > [body]: ${body}`);

    const status = await this.superpaveService.calculateStep9RiceTest(body);

    return response.status(200).json(status);
  }

  @Post('calculate-dosage-equation')
  async calculateDosageResumeEquation(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate dosage equation > [body]: ${body}`);

    const status = await this.superpaveService.calculateDosageResumeEquation(body);

    return response.status(200).json(status);
  }

  @Post('save-confirmattion-compression-step/:userId')
  async saveConfirmattionCompressionData(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any,
  ) {
    this.logger.log(`save confirmattion compression data > [body]: ${body}`);

    const status = await this.superpaveService.saveConfirmattionCompressionData(body, userId);

    return response.status(200).json(status);
  }

  @Post('save-superpave-dosage/:userId')
  async saveSuperpaveDosage(@Res() response: Response, @Param('userId') userId: string, @Body() body: any) {
    this.logger.log(`save superpave dosage > [body]: ${body}`);

    const status = await this.superpaveService.saveSuperpaveDosage(body, userId);

    return response.status(200).json(status);
  }

  @Delete(':id')
  async deleteMarshallDosage(@Res() response: Response, @Param('id') id: string) {
    this.logger.log(`delete superpave dosage > [body]: ${id}`);

    const status = await this.superpaveService.deleteSuperpaveDosage(id);

    return response.status(200).json(status);
  }
}

import { Body, Controller, Delete, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SuperpaveService } from '../service';
import { SuperpaveInitDto } from '../dto/superpave-init.dto';

@ApiTags('superpave')
@Controller('asphalt/dosages/superpave')
export class SuperpaveController {
  private logger = new Logger(SuperpaveController.name);

  constructor(private readonly superpaveService: SuperpaveService) { }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as dosagens do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Dosagens encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all dosages by user id > [id]: ${userId}`);

    return this.superpaveService.getAllDosages(userId);
  }

  // Deveria entregar os dados salvos no banco de dados da Superpave
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
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma Superpave com os dados enviados.' })
  async verifyInitSuperpave(@Res() response: Response, @Body() body: SuperpaveInitDto, @Param('id') userId: string) {
    this.logger.log('verify init Superpave > [body]');

    const status = await this.superpaveService.verifyInitSuperpave(body, userId);

    return response.status(200).json(status);
  }

  @Get('material-selection/:id')
  @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.' })
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
  async saveMaterialSelectionStep(
    @Res() response: Response,
    @Body() body: any,
    @Param('id') userId: string,
  ) {
    this.logger.log(`save materials selection step in user superpave dosage > [body]: ${body}`);

    const status = await this.superpaveService.saveMaterialSelectionStep(body, userId);

    return response.status(200).json(status);
  }

  @Post('step-3-data')
  @ApiOperation({ summary: 'Retorna os dados iniciais necessários para a terceira tela (composição granulométrica) da dosagem' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } }, 
  })
  @ApiResponse({ status: 400, description: 'Dados não encontrados!' })
  async getStep3Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get step 3 data > [body]: ${body}`);

    const status = await this.superpaveService.getStep3Data(body);

    return response.status(200).json(status);
  }

  @Post('calculate-step-3-data')
  async calculateStep3Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 3 data > [body]: ${body}`);

    const status = await this.superpaveService.calculateStep3Data(body);

    return response.status(200).json(status);
  }

  @Post('save-granulometry-composition-step/:userId')
  async saveGranulometryCompositionStep(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 3 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep3Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('step-4-specific-masses')
  @ApiOperation({ summary: 'Retorna os dados iniciais necessários para a quarta tela (teor de ligante inicial) da dosagem' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } }, 
  })
  async getStep4SpecificMasses(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get step 4 data > [body]: ${body}`);

    const status = await this.superpaveService.getStep4SpecificMasses(body);

    return response.status(200).json(status);
  }

  @Post('step-4-data')
  @ApiOperation({ summary: 'Calcula os dados inseridos para a quarta tela (teor de ligante inicial) da dosagem' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } }, 
  })
  @ApiResponse({ status: 400, description: 'Dados não encontrados!' })
  async getStep4Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get step 3 data > [body]: ${body}`);

    const status = await this.superpaveService.getStep4Data(body);

    return response.status(200).json(status);
  }

  @Post('save-initial-binder-step/:userId')
  async saveInitialBinderStep(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 4 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep4Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-gmm')
  async calculateRiceTest(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 5 rice test data > [body]: ${body}`);
  
    const status = await this.superpaveService.calculateGmm(body);

    return response.status(200).json(status);
  }

  @Post('save-first-compression-step/:userId')
  async saveFirstCompressionStep(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 5 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep5Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('step-5-parameters')
  @ApiOperation({ summary: 'Retorna os dados iniciais necessários para a quinta tela (porcentagens da curva escolhida) da dosagem' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } }, 
  })
  async getStep6Parameters(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get step 6 data > [body]: ${body}`);

    const status = await this.superpaveService.getStep6Parameters(body);

    return response.status(200).json(status);
  }
  

  @Post('save-first-curve-percentage-step/:userId')
  async saveStep6Data(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 6 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep6Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('step-7-parameters')
  @ApiOperation({ summary: 'Retorna os dados iniciais necessários para a sétima tela (porcentagens da curva escolhida) da dosagem' })
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
  async saveStep7Data(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
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
  async calculateVolumetricParametersOfChoosenGranulometryComposition(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 7 volumetric parameters of choosen granulometry composition data > [body]: ${body}`);
  
    const status = await this.superpaveService.calculateVolumetricParametersOfChoosenGranulometryComposition(body);

    return response.status(200).json(status);
  }

  @Post('save-second-compression-data-step/:userId')
  async saveStep8Data(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 8 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep8Data(body, userId);

    return response.status(200).json(status);
    
  }

  @Post('get-step-9-data')
  @ApiOperation({ summary: 'Retorna os dados iniciais necessários para a nona tela (parâmetros da segunda compactação) da dosagem' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } }, 
  })
  async getStep9Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`get step 9 data > [body]: ${body}`);

    const status = await this.superpaveService.getStep9Data(body);

    return response.status(200).json(status);
  }

  @Post('save-second-compression-params-step/:userId')
  async saveStep9Data(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 9 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep9Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-step-9-rice-test')
  async calculateStep9RiceTest(
    @Res() response: Response,
    @Body() body: any
  ) {
    this.logger.log(`calculate dosage equation > [body]: ${body}`);

    const status = await this.superpaveService.calculateStep9RiceTest(body);

    return response.status(200).json(status);
  }


  @Post('calculate-dosage-equation')
  async calculateVolumetricParametersOfConfirmGranulometryComposition(
    @Res() response: Response,
    @Body() body: any
  ) {
    this.logger.log(`calculate dosage equation > [body]: ${body}`);

    const status = await this.superpaveService.calculateVolumetricParametersOfConfirmGranulometryComposition(body);

    return response.status(200).json(status);
  }

  @Post('save-confirmattion-compression-step/:userId')
  async saveStep10Data(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 10 data > [body]: ${body}`);

    const status = await this.superpaveService.saveStep10Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('save-superpave-dosage/:userId')
  async saveSuperpaveDosage(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save superpave dosage > [body]: ${body}`);

    const status = await this.superpaveService.saveSuperpaveDosage(body, userId);

    return response.status(200).json(status);
  }

  @Delete(':id')
  async deleteMarshallDosage(
    @Res() response: Response,
    @Param('id') id: string
  ) {
    this.logger.log(`delete superpave dosage > [body]: ${id}`);

    const status = await this.superpaveService.deleteSuperpaveDosage(id);

    return response.status(200).json(status);
  }
}

import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { MarshallService } from '../service';
import { MarshallInitDto } from '../dto/marshall-init.dto';
import { MarshallStep3Dto } from '../dto/step-3-marshall.dto';

@ApiTags('marshall')
@Controller('asphalt/dosages/marshall')
export class MarshallController {
  private logger = new Logger(MarshallController.name);

  constructor(private readonly marshallService: MarshallService) { }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as dosagens do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Dosagens encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all dosages by user id > [id]: ${userId}`);

    return this.marshallService.getAllDosages(userId);
  }

  @Post('verify-init/:id')
  @ApiOperation({ summary: 'Verifica se é possível criar uma Marshall com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma Marshall com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma Marshall com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma Marshall com os dados enviados.' })
  async verifyInitMarshall(@Res() response: Response, @Body() body: MarshallInitDto, @Param('id') userId: string) {
    this.logger.log('verify init Marshall > [body]');

    const status = await this.marshallService.verifyInitMarshall(body, userId);


    return response.status(200).json(status);
  }

  @Get('material-selection/:id')
  @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.' })
  @ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getMaterialsByUserId(@Res() response: Response, @Param('id') userId: string) {
    this.logger.log(`get all materials, by user id, with the necessary dosage essays > [id]: ${userId}`);

    const status = await this.marshallService.getUserMaterials(userId);

    return response.status(200).json(status);
  }

  @Post('save-material-selection-step/:id')
  async saveMaterialSelectionStep(
    @Res() response: Response,
    @Body() body: any,
    @Param('id') userId: string
  ) {
    this.logger.log(`save materials selection step in user marshall dosage > [body]: ${body}`);

    const status = await this.marshallService.saveMaterialSelectionStep(body, userId);


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

    const status = await this.marshallService.getStep3Data(body);

    return response.status(200).json(status);
  }

  @Post('calculate-step-3-data')
  async calculateStep3Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 3 data > [body]: ${body}`);

    const status = await this.marshallService.calculateStep3Data(body);


    return response.status(200).json(status);
  }

  @Post('save-granulometry-composition-step/:userId')
  async saveGranulometryCompositionStep(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 3 data > [body]: ${body}`);

    const status = await this.marshallService.saveStep3Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('calculate-step-4-data')
  async calculateStep4Data(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 4 data > [body]: ${body}`);

    const status = await this.marshallService.calculateStep4Data(body);

    return response.status(200).json(status);
  }

  @Post('save-binder-trial-step/:userId')
  async saveBinderTrialStep(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body() body: any
  ) {
    this.logger.log(`save step 4 data > [body]: ${body}`);

    const status = await this.marshallService.saveStep4Data(body, userId);

    return response.status(200).json(status);
  }

  @Post('get-specific-mass-indexes')
  async getIndexesOfMissesSpecificGravity(
    @Res() response: Response,
    @Body() aggregates: any
    ) {
    this.logger.log(`get specific mass indexes - step 5 > [body]: ${aggregates}`);

    const status = await this.marshallService.getIndexesOfMissesSpecificGravity(aggregates);

    return response.status(200).json(status);
  }

  @Post('calculate-step-5-dmt-data')
  async calculateDmtData(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 5 dmt data > [body]: ${body}`);

    const status = await this.marshallService.calculateDmtData(body);

    return response.status(200).json(status);
  }

  @Post('calculate-step-5-gmm-data')
  async calculateGmmData(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 5 gmm data > [body]: ${body}`);

    const status = await this.marshallService.calculateGmmData(body);

    return response.status(200).json(status);
  }

  @Post('calculate-step-5-rice-test')
  async calculateRiceTest(@Res() response: Response, @Body() body: any) {
    this.logger.log(`calculate step 5 rice test > [body]: ${body}`);

    const status = await this.marshallService.calculateRiceTest(body);

    return response.status(200).json(status);
  }
}
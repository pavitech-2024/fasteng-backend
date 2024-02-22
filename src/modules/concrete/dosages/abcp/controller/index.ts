import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ABCPService } from '../service';
import { ABCPInitDto } from '../dto/abcp-init.dto';
import { ABCPEssaySelectionDto } from '../dto/abcp-essay-selection.dto';
import { Calc_ABCP_Dto, Calc_ABCP_Out, SaveAbcpDto } from '../dto/abcp-calculate-results.dto';

@ApiTags('abcp')
@Controller('concrete/dosages/abcp')
export class ABCPController {
  private logger = new Logger(ABCPController.name);
  

  constructor(private readonly abcpService: ABCPService) { }

  @Post('verify-init/:id')
  @ApiOperation({ summary: 'Verifica se é possível criar uma ABCP com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma ABCP com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma ABCP com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma ABCP com os dados enviados.' })
  async verifyInitABCP(@Res() response: Response, @Body() body: any, @Param('id') userId: string) {
    this.logger.log('verify init abcp > [body]');

    const isConsult = body.isConsult2;
    console.log("🚀 ~ ABCPController ~ verifyInitABCP ~ isConsult:", isConsult)

    const status = await this.abcpService.verifyInitABCP(body, userId, isConsult);

    return response.status(200).json(status);
  }

  @Get('material-selection/:id')
  @ApiOperation({ summary: 'Retorna todas as dosagens do banco de dados de um usuário, que possuam os ensaios para a dosagem.' })
  @ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getMaterialsByUserId(@Res() response: Response, @Param('id') userId: string) {
    this.logger.log(`get all materials by user id with the abcp essays > [id]: ${userId}`);

    const status = await this.abcpService.getUserMaterials(userId);

    return response.status(200).json(status);
  }

  @Post('save-material-selection-step/:id')
  async saveMaterialSelectionStep(
    @Res() response: Response, 
    @Body() body: any, 
    @Param('id') userId: string
    ) {
    this.logger.log(`save materials selection step in user abcp dosage > [body]: ${body}`);

    const status = await this.abcpService.saveMaterialSelectionStep(body, userId);

    return response.status(200).json(status);
  }

  @Post('essay-selection')
  @ApiOperation({ summary: 'Retorna todas as dosagens do banco de dados de um usuário, que possuam os ensaios para a dosagem.' })
  @ApiResponse({ status: 200, description: 'Dosagens encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getEssaysByUserId(@Res() response: Response, @Body() data: any) {
    this.logger.log(`get all abcp dosages by user id`);

    const status = await this.abcpService.getEssaysByMaterials(data);

    return response.status(200).json(status);
  }

  @Post('save-essay-selection-step/:id')
  async saveEssaySelectionStep(
    @Res() response: Response, 
    @Body() body: any, 
    @Param('id') userId: string
    ) {
    this.logger.log(`save essay selection step in user abcp dosage > [body]: ${body}`);

    const status = await this.abcpService.saveEssaySelectionStep(body, userId);

    return response.status(200).json(status);
  }

  @Post('save-insert-params-step/:id')
  async saveInsertParamsStep(
    @Res() response: Response, 
    @Body() body: any, 
    @Param('id') userId: string
    ) {
    this.logger.log(`save insert params step in user abcp dosage > [body]: ${body}`);

    const status = await this.abcpService.saveInsertParamsStep(body, userId);

    return response.status(200).json(status);
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todas as dosagens do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Dosagens encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all dosages by user id > [id]: ${userId}`);

    return this.abcpService.getAllDosages(userId);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Retorna a dosagem com o id especificado.' })
  @ApiResponse({ status: 200, description: 'Dosagem encontrada com sucesso!' })
  async getDosageById(@Param('id') dosageId: string) {
    this.logger.log(`get a dosage by dosage id > [id]: ${dosageId}`);

    return this.abcpService.getDosageById(dosageId);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Retorna os resultados dos calculos para a dosagem.' })
  @ApiResponse({ status: 200, description: 'Resultados entregues com sucesso!' })
  async calculateAbcpDosage(@Res() response: Response, @Body() data: Calc_ABCP_Dto) {
    this.logger.log(`get the results of abcp dosage`);

    const status = await this.abcpService.calculateAbcpDosage(data);

    return response.status(200).json(status);
  }

  @Post('save-dosage')
  @ApiOperation({ summary: 'Se possível, salva os dados da dosagem abcp de concreto no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados da dosagem abcp de concreto salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'dosage data' } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível salvar os dados da dosagem abcp de concreto no banco de dados.',
    content: {
      'application/json': {
        schema: {
          example: {
            success: false,
            error: { message: 'ABCP dosage with name "ABCP 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da dosagem abcp de concreto no banco de dados.' })
  async saveConcreteEssay(@Res() response: Response, @Body() body: 
  SaveAbcpDto) {
    this.logger.log('save concrete essay > [body]');

    const abcp = await this.abcpService.saveDosage(body);

    if (abcp.success) this.logger.log('save concrete abcp dosage > [success]');
    else this.logger.error('save concrete abcp dosage > [error]');

    return response.status(200).json(abcp);
  }
}
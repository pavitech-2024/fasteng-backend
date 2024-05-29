import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SuperpaveService } from '../service';
import { SuperpaveInitDto } from '../dto/superpave-init.dto';
import { SuperpaveStep3Dto } from '../dto/step-3-superpave.dto';

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
}

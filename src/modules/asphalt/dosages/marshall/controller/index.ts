import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MarshallService } from '../service';
import { MarshallInitDto } from '../dto/marshall-init.dto';
import { MarshallStep3Dto } from '../dto/step-3-marshall.dto';

@ApiTags('marshall')
@Controller('asphalt/dosages/marshall')
export class MarshallController {
  private logger = new Logger(MarshallController.name);

  constructor(private readonly marshallService: MarshallService) { }

  @Post('verify-init')
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
  async verifyInitMarshall(@Res() response: Response, @Body() body: MarshallInitDto) {
    this.logger.log('verify init Marshall > [body]');

    const status = await this.marshallService.verifyInitMarshall(body);

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

  @Post('step-3-data')
  @ApiOperation({ summary: 'Retorna os dados iniciais necessários para a terceira tela (composição granulométrica) da dosagem' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dados carregados com sucesso!',
    content: { 'application/json': { schema: { example: { data: {}, success: true } } } }, 
  })
  @ApiResponse({ status: 400, description: 'Dados não encontrados!' })
  async getStep3Data(@Res() response: Response, @Body() body: MarshallStep3Dto) {
    this.logger.log(`get step 3 data > [body]: ${body}`);

    const status = await this.marshallService.getStep3Data(body);

    return response.status(200).json(status);
  }
}
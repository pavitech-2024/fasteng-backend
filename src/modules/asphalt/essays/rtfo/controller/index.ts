import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { Response } from 'express';
import { Calc_Rtfo_Dto, Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";
import { RtfoInitDto } from "../dto/rtfo-init.dto";
import { RtfoService } from "../service";

@ApiTags('rtfo')
@Controller('asphalt/essays/rtfo')
export class RtfoController {
  private logger = new Logger(RtfoController.name);

  constructor(private readonly rtfoService: RtfoService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de rtfo com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de rtfo com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de rtfo com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de rtfo com os dados enviados.' })
  async verifyInitRtfo(@Res() response: Response, @Body() body: RtfoInitDto) {
    this.logger.log('verify init rtfo > [body]');

    const status = await this.rtfoService.verifyInitRtfo(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados d ensaio de rtfo com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados d ensaio de rtfo calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados d ensaio de rtfo com os dados enviados.' })
  async calculateRtfo(@Body() body: Calc_Rtfo_Dto) {
    this.logger.log('calculate rtfo > [body]');

    const rtfo = await this.rtfoService.calculateRtfo(body);

    if (rtfo.success) this.logger.log('calculate rtfo > [success]');
    else this.logger.error('calculate rtfo > [error]');

    return rtfo;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados d ensaio de rtfo no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados d ensaio de rtfo salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados d ensaio de rtfo no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_Rtfo_Dto & Calc_Rtfo_Out) {
    this.logger.log('save rtfo > [body]');

    const rtfo = await this.rtfoService.saveEssay(body);

    if (rtfo.success) this.logger.log('save rtfo > [success]');
    else this.logger.error('save rtfo > [error]');

    return response.status(200).json(rtfo);
  }
}

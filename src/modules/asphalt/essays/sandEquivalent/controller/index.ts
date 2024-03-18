import { Controller, Logger, Post, Res, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Calc_SandEquivalent_Dto, Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";
import { SandEquivalentInitDto } from "../dto/init-sandEquivalent.dto";
import { Response } from 'express';
import { SandEquivalentService } from "../service";

@ApiTags('sandEquivalent')
@Controller('asphalt/essays/sandEquivalent')
export class SandEquivalentController {
  private logger = new Logger(SandEquivalentController.name);

  constructor(private readonly sandEquivalentService: SandEquivalentService) {}

  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar um ensaio de equivalente de areia com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar um ensaio de equivalente de areia com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar um ensaio de equivalente de areia com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de equivalente de areia com os dados enviados.' })
  async verifyInitSandEquivalent(@Res() response: Response, @Body() body: SandEquivalentInitDto) {
    this.logger.log('verify init sandEquivalent > [body]');

    const status = await this.sandEquivalentService.verifyInitSandEquivalent(body);

    return response.status(200).json(status);
  }

  @Post('calculate-results')
  @ApiOperation({ summary: 'Calcula os resultados do ensaio de equivalente de areia com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'Resultados d ensaio de equivalente de areia calculados com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados do ensaio de equivalente de areia com os dados enviados.' })
  async calculateSandEquivalent(@Body() body: Calc_SandEquivalent_Dto) {
    this.logger.log('calculate sandEquivalent > [body]');

    const sandEquivalent = await this.sandEquivalentService.calculateSandEquivalent(body);

    if (sandEquivalent.success) this.logger.log('calculate sandEquivalent > [success]');
    else this.logger.error('calculate sandEquivalent > [error]');

    return sandEquivalent;
  }

  @Post('save-essay')
  @ApiOperation({ summary: 'Se possível, salva os dados do ensaio de equivalente de areia no banco de dados.' })
  @ApiResponse({
    status: 200,
    description: 'Dados do ensaio de equivalente de areia salvos com sucesso.',
    content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
  })
  @ApiResponse({ status: 400, description: 'Erro ao salvar os dados do ensaio de equivalente de areia no banco de dados.' })
  async saveEssay(@Res() response: Response, @Body() body: Calc_SandEquivalent_Dto & Calc_SandEquivalent_Out) {
    this.logger.log('save sandEquivalent > [body]');

    const sandEquivalent = await this.sandEquivalentService.saveEssay(body);

    if (sandEquivalent.success) this.logger.log('save sandEquivalent > [success]');
    else this.logger.error('save sandEquivalent > [error]');

    return response.status(200).json(sandEquivalent);
  }
}

import { Controller, Logger, Post, Res, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitMassInitDto } from '../dto/unitMass-init.dto';
import { UnitMassService } from '../service/unitMass.service';

@ApiTags('unitMass')
@Controller('concrete/essays/unitMass')
export class UnitMassController {
  private logger = new Logger(UnitMassController.name);
  constructor(private readonly UnitMassService: UnitMassService) {}
  @Post('verify-init')
  @ApiOperation({ summary: 'Verifica se é possível criar uma massa unitária com os dados enviados.' })
  @ApiResponse({
    status: 200,
    description: 'É possível criar uma massa unitária com os dados enviados.',
    content: { 'application/json': { schema: { example: { success: true } } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Não é possível criar uma massa unitária com os dados enviados.',
    content: {
      'application/json': {
        schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao verificar se é possível criar uma massa unitária com os dados enviados.',
  })
  async verifyInitUnitMass(@Res() response: Response, @Body() body: UnitMassInitDto) {
    this.logger.log('verify init unitMass > [body]');

    const status = await this.UnitMassService.verifyInitUnitMass(body);

    return response;
  }
}

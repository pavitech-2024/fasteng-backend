import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DuctilityService } from "../service";
import { Calc_DUCTILITY_Dto, Calc_DUCTILITY_Out } from "../dto/calc.ductility.dto";
import { DuctilityInitDto } from "../dto/ductility-init.dto";

@ApiTags('ductility')
@Controller('asphalt/essays/ductility')
export class DuctilityController {
    private logger = new Logger(DuctilityController.name);

    constructor(private readonly ductilityService: DuctilityService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma DUCTILITY com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma DUCTILITY com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma DUCTILITY com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma DUCTILITY com os dados enviados.' })
    async verifyInitDuctility(@Res() response: Response, @Body() body: DuctilityInitDto) {
        this.logger.log('verify init ductility > [body]');

        const status = await this.ductilityService.verifyInitDuctility(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da DUCTILITY com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da DUCTILITY calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da DUCTILITY com os dados enviados.' })
    async calculateDuctility(@Body() body: Calc_DUCTILITY_Dto) {
        this.logger.log('calculate ductility > [body]');

        const ductility = await this.ductilityService.calculateDuctility(body);

        if (ductility.success) this.logger.log('calculate ductility > [success]');
        else this.logger.error('calculate ductility > [error]');

        return ductility;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da DUCTILITY no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da DUCTILITY salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da DUCTILITY no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'DUCTILITY with name "DUCTILITY 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da DUCTILITY no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_DUCTILITY_Dto & Calc_DUCTILITY_Out) {
        this.logger.log('save essay > [body]');

        const ductility = await this.ductilityService.saveEssay(body);

        if (ductility.success) this.logger.log('save ductility essay > [success]');
        else this.logger.error('save ductility essay > [error]');

        return response.status(200).json(ductility);
    }
}
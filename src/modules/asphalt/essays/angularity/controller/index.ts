import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AngularityService } from "../service";
import { Calc_ANGULARITY_Dto, Calc_ANGULARITY_Out } from "../dto/calc.angularity.dto";
import { AngularityInitDto } from "../dto/angularity-init.dto";

@ApiTags('angularity')
@Controller('asphalt/essays/angularity')
export class AngularityController {
    private logger = new Logger(AngularityController.name);

    constructor(private readonly angularityService: AngularityService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma ANGULARITY com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma ANGULARITY com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma ANGULARITY com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma ANGULARITY com os dados enviados.' })
    async verifyInitAngularity(@Res() response: Response, @Body() body: AngularityInitDto) {
        this.logger.log('verify init angularity > [body]');

        const status = await this.angularityService.verifyInitAngularity(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da ANGULARITY com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da ANGULARITY calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da ANGULARITY com os dados enviados.' })
    async calculateAngularity(@Body() body: Calc_ANGULARITY_Dto) {
        this.logger.log('calculate angularity > [body]');

        const angularity = await this.angularityService.calculateAngularity(body);

        if (angularity.success) this.logger.log('calculate angularity > [success]');
        else this.logger.error('calculate angularity > [error]');

        return angularity;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da ANGULARITY no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da ANGULARITY salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da ANGULARITY no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'ANGULARITY with name "ANGULARITY 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da ANGULARITY no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_ANGULARITY_Dto & Calc_ANGULARITY_Out) {
        this.logger.log('save essay > [body]');

        const angularity = await this.angularityService.saveEssay(body);

        if (angularity.success) this.logger.log('save angularity essay > [success]');
        else this.logger.error('save angularity essay > [error]');

        return response.status(200).json(angularity);
    }
}
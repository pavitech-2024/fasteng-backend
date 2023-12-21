import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ElasticRecoveryService } from "../service";
import { Calc_ElasticRecovery_Dto, Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";
import { ElasticRecoveryInitDto } from "../dto/elasticRecovery-init.dto";

@ApiTags('elasticRecovery')
@Controller('asphalt/essays/elasticRecovery')
export class ElasticRecoveryController {
    private logger = new Logger(ElasticRecoveryController.name);

    constructor(private readonly elasticRecoveryService: ElasticRecoveryService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma ElasticRecovery com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma ElasticRecovery com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma ElasticRecovery com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma ElasticRecovery com os dados enviados.' })
    async verifyInitelasticRecovery(@Res() response: Response, @Body() body: ElasticRecoveryInitDto) {
        this.logger.log('verify init elasticRecovery > [body]');

        const status = await this.elasticRecoveryService.verifyInitElasticRecovery(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da ElasticRecovery com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da ElasticRecovery calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da ElasticRecovery com os dados enviados.' })
    async calculateElasticRecovery(@Body() body: Calc_ElasticRecovery_Dto) {
        this.logger.log('calculate elasticRecovery > [body]');

        const elasticRecovery = await this.elasticRecoveryService.calculateElasticRecovery(body);

        if (elasticRecovery.success) this.logger.log('calculate elasticRecovery > [success]');
        else this.logger.error('calculate elasticRecovery > [error]');

        return elasticRecovery;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da ElasticRecovery no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da ElasticRecovery salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da ElasticRecovery no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'ElasticRecovery with name "ElasticRecovery 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da ElasticRecovery no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_ElasticRecovery_Dto & Calc_ElasticRecovery_Out) {
        this.logger.log('save essay > [body]');

        const elasticRecovery = await this.elasticRecoveryService.saveEssay(body);

        if (elasticRecovery.success) this.logger.log('save elasticRecovery essay > [success]');
        else this.logger.error('save elasticRecovery essay > [error]');

        return response.status(200).json(elasticRecovery);
    }
}
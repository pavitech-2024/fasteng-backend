import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ElongatedParticlesService } from "../service";
import { Calc_ELONGATEDPARTICLES_Dto, Calc_ELONGATEDPARTICLES_Out } from "../dto/calc.elongatedParticles.dto";
import { ElongatedParticlesInitDto } from "../dto/elongatedParticles-init.dto";

@ApiTags('elongatedParticles')
@Controller('asphalt/essays/elongatedParticles')
export class ElongatedParticlesController {
    private logger = new Logger(ElongatedParticlesController.name);

    constructor(private readonly elongatedParticlesService: ElongatedParticlesService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma ELONGATEDPARTICLES com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma ELONGATEDPARTICLES com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma ELONGATEDPARTICLES com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma ELONGATEDPARTICLES com os dados enviados.' })
    async verifyInitElongatedParticles(@Res() response: Response, @Body() body: ElongatedParticlesInitDto) {
        this.logger.log('verify init elongatedParticles > [body]');

        const status = await this.elongatedParticlesService.verifyInitElongatedParticles(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da ELONGATEDPARTICLES com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da ELONGATEDPARTICLES calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da ELONGATEDPARTICLES com os dados enviados.' })
    async calculateElongatedParticles(@Body() body: Calc_ELONGATEDPARTICLES_Dto) {
        this.logger.log('calculate elongatedParticles > [body]');

        const elongatedParticles = await this.elongatedParticlesService.calculateElongatedParticles(body);

        if (elongatedParticles.success) this.logger.log('calculate elongatedParticles > [success]');
        else this.logger.error('calculate elongatedParticles > [error]');

        return elongatedParticles;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da ELONGATEDPARTICLES no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da ELONGATEDPARTICLES salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da ELONGATEDPARTICLES no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'ELONGATEDPARTICLES with name "ELONGATEDPARTICLES 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da ELONGATEDPARTICLES no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_ELONGATEDPARTICLES_Dto & Calc_ELONGATEDPARTICLES_Out) {
        this.logger.log('save essay > [body]');

        const elongatedParticles = await this.elongatedParticlesService.saveEssay(body);

        if (elongatedParticles.success) this.logger.log('save elongatedParticles essay > [success]');
        else this.logger.error('save elongatedParticles essay > [error]');

        return response.status(200).json(elongatedParticles);
    }
}
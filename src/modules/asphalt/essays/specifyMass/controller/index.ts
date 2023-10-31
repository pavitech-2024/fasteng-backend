import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SpecifyMassService } from "../service";
import { Calc_SPECIFYMASS_Dto, Calc_SPECIFYMASS_Out } from "../dto/calc.specifyMass.dto";
import { SpecifyMassInitDto } from "../dto/specifyMass-init.dto";

@ApiTags('specifyMass')
@Controller('asphalt/essays/specifyMass')
export class SpecifyMassController {
    private logger = new Logger(SpecifyMassController.name);

    constructor(private readonly specifyMassService: SpecifyMassService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma SPECIFYMASS com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma SPECIFYMASS com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma SPECIFYMASS com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma SPECIFYMASS com os dados enviados.' })
    async verifyInitSpecifyMass(@Res() response: Response, @Body() body: SpecifyMassInitDto) {
        this.logger.log('verify init specifymass > [body]');

        const status = await this.specifyMassService.verifyInitSpecifyMass(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da SPECIFYMASS com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da SPECIFYMASS calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da SPECIFYMASS com os dados enviados.' })
    async calculateSpecifyMass(@Body() body: Calc_SPECIFYMASS_Dto) {
        this.logger.log('calculate specifymass > [body]');

        const specifymass = await this.specifyMassService.calculateSpecifyMass(body);

        if (specifymass.success) this.logger.log('calculate specifymass > [success]');
        else this.logger.error('calculate specifymass > [error]');

        return specifymass;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da SPECIFYMASS no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da SPECIFYMASS salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da SPECIFYMASS no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'SPECIFYMASS with name "SPECIFYMASS 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da SPECIFYMASS no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_SPECIFYMASS_Dto & Calc_SPECIFYMASS_Out) {
        this.logger.log('save essay > [body]');

        const specifymass = await this.specifyMassService.saveEssay(body);

        if (specifymass.success) this.logger.log('save specifymass essay > [success]');
        else this.logger.error('save specifymass essay > [error]');

        return response.status(200).json(specifymass);
    }
}
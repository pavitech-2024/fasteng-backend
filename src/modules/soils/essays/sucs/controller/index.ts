import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SucsService } from '../service/index';
import { SucsInitDto } from '../dto/sucs-init.dto';
import { Calc_SUCS_Dto, Calc_SUCS_Out } from '../dto/calc.sucs.dto';

@ApiTags('sucs')
@Controller('soils/essays/sucs')
export class SucsController {
    private logger = new Logger(SucsController.name);

    constructor(private readonly sucsService: SucsService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma SUCS com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma SUCS com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma SUCS com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma SUCS com os dados enviados.' })
    async verifyInitSucs(@Res() response: Response, @Body() body: SucsInitDto) {
        this.logger.log('verify init sucs > [body]');

        const status = await this.sucsService.verifyInitSucs(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da SUCS com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da SUCS calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da SUCS com os dados enviados.' })
    async calculateSucs(@Body() body: Calc_SUCS_Dto) {
        this.logger.log('calculate sucs > [body]');

        const sucs = await this.sucsService.calculateSucs(body);

        if (sucs.success) this.logger.log('calculate sucs > [success]');
        else this.logger.error('calculate sucs > [error]');

        return sucs;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da SUCS no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da SUCS salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da SUCS no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'SUCS with name "SUCS 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da SUCS no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_SUCS_Dto & Calc_SUCS_Out) {
        this.logger.log('save essay > [body]');

        const sucs = await this.sucsService.saveEssay(body);

        if (sucs.success) this.logger.log('save sucs essay > [success]');
        else this.logger.error('save sucs essay > [error]');

        return response.status(200).json(sucs);
    }
}
import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GranulometryService } from '../service';
import { GranulometryInitDto } from '../dto/granulometry-init.dto';
import { Calc_GRANULOMETRY_Dto, Calc_GRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { Granulometry } from '../schemas';

@ApiTags('granulometry')
@Controller('soils/essays/granulometry')
export class GranulometryController {
    private logger = new Logger(GranulometryController.name);

    constructor(private readonly granulometryService: GranulometryService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma GRANULOMETRY com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma GRANULOMETRY com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma GRANULOMETRY com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma GRANULOMETRY com os dados enviados.' })
    async verifyInitGranulometry(@Res() response: Response, @Body() body: GranulometryInitDto) {
        this.logger.log('verify init granulometry > [body]');

        const status = await this.granulometryService.verifyInitGranulometry(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da GRANULOMETRY com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da GRANULOMETRY calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da GRANULOMETRY com os dados enviados.' })
    async calculateGranulometry(@Body() body: Calc_GRANULOMETRY_Dto) {
        this.logger.log('calculate granulometry > [body]');

        const granulometry = await this.granulometryService.calculateGranulometry(body);

        if (granulometry.success) this.logger.log('calculate granulometry > [success]');
        else this.logger.error('calculate granulometry > [error]');

        return granulometry;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da GRANULOMETRY no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da GRANULOMETRY salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da GRANULOMETRY no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'GRANULOMETRY with name "GRANULOMETRY 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da GRANULOMETRY no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_GRANULOMETRY_Dto & Calc_GRANULOMETRY_Out) {
        this.logger.log('save essay > [body]');

        const granulometry = await this.granulometryService.saveEssay(body);

        if (granulometry.success) this.logger.log('save granulometry essay > [success]');
        else this.logger.error('save granulometry essay > [error]');

        return response.status(200).json(granulometry);
    }

    @Get('get/:sample_id')
    @ApiOperation({ summary: 'Retorna um ensaio de Granulometria do banco de dados.' })
    @ApiResponse({ 
        status: 200, 
        description: 'Granulometria encontrada com sucesso!',
        //type: Granulometry, 
        type: Calc_GRANULOMETRY_Out
    })
    @ApiResponse({ status: 400, description: 'Granulometria não encontrada!' })
    async getGranulometryBySampleId(@Res() response: Response, @Param('sample_id') sample_id: string) {
    this.logger.log(`get granulometry by sample id > [sample_id]: ${sample_id}`);

    const granulometry = await this.granulometryService.getGranulometryBySampleId(sample_id);

    return response.status(200).json(granulometry);
  }
}
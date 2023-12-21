import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FlashPointService } from "../service";
import { Calc_FLASHPOINT_Dto, Calc_FLASHPOINT_Out } from "../dto/calc.flashPoint.dto";
import { FlashPointInitDto } from "../dto/flashPoint-init.dto";

@ApiTags('flashPoint')
@Controller('asphalt/essays/flashPoint')
export class FlashPointController {
    private logger = new Logger(FlashPointController.name);

    constructor(private readonly flashPointService: FlashPointService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma FLASHPOINT com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma FLASHPOINT com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma FLASHPOINT com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma FLASHPOINT com os dados enviados.' })
    async verifyInitFlashPoint(@Res() response: Response, @Body() body: FlashPointInitDto) {
        this.logger.log('verify init flashPoint > [body]');

        const status = await this.flashPointService.verifyInitFlashPoint(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da FLASHPOINT com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da FLASHPOINT calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da FLASHPOINT com os dados enviados.' })
    async calculateFlashPoint(@Body() body: Calc_FLASHPOINT_Dto) {
        this.logger.log('calculate flashPoint > [body]');

        const flashPoint = await this.flashPointService.calculateFlashPoint(body);

        if (flashPoint.success) this.logger.log('calculate flashPoint > [success]');
        else this.logger.error('calculate flashPoint > [error]');

        return flashPoint;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da FLASHPOINT no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da FLASHPOINT salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da FLASHPOINT no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'FLASHPOINT with name "FLASHPOINT 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da FLASHPOINT no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_FLASHPOINT_Dto & Calc_FLASHPOINT_Out) {
        this.logger.log('save essay > [body]');

        const flashPoint = await this.flashPointService.saveEssay(body);

        if (flashPoint.success) this.logger.log('save flashPoint essay > [success]');
        else this.logger.error('save flashPoint essay > [error]');

        return response.status(200).json(flashPoint);
    }
}
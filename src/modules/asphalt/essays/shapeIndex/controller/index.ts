import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ShapeIndexService } from "../service";
import { Calc_SHAPEINDEX_Dto, Calc_SHAPEINDEX_Out } from "../dto/calc.shapeIndex.dto";
import { ShapeIndexInitDto } from "../dto/shapeIndex-init.dto";

@ApiTags('shapeIndex')
@Controller('asphalt/essays/shapeIndex')
export class ShapeIndexController {
    private logger = new Logger(ShapeIndexController.name);

    constructor(private readonly shapeIndexService: ShapeIndexService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma SHAPEINDEX com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma SHAPEINDEX com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma SHAPEINDEX com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma SHAPEINDEX com os dados enviados.' })
    async verifyInitShapeIndex(@Res() response: Response, @Body() body: ShapeIndexInitDto) {
        this.logger.log('verify init shapeindex > [body]');

        const status = await this.shapeIndexService.verifyInitShapeIndex(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da SHAPEINDEX com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'Resultados da SHAPEINDEX calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da SHAPEINDEX com os dados enviados.' })
    async calculateShapeIndex(@Body() body: Calc_SHAPEINDEX_Dto) {
        this.logger.log('calculate shapeindex > [body]');

        const shapeindex = await this.shapeIndexService.calculateShapeIndex(body);

        if (shapeindex.success) this.logger.log('calculate shapeindex > [success]');
        else this.logger.error('calculate shapeindex > [error]');

        return shapeindex;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da SHAPEINDEX no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da SHAPEINDEX salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da SHAPEINDEX no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'SHAPEINDEX with name "SHAPEINDEX 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da SHAPEINDEX no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_SHAPEINDEX_Dto & Calc_SHAPEINDEX_Out) {
        this.logger.log('save essay > [body]');

        const shapeindex = await this.shapeIndexService.saveEssay(body);

        if (shapeindex.success) this.logger.log('save shapeindex essay > [success]');
        else this.logger.error('save shapeindex essay > [error]');

        return response.status(200).json(shapeindex);
    }
}
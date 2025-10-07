import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConcreteGranulometryService } from '../service'; 
import { ConcreteGranulometryInitDto } from '../dto/concretegranulometry-init.dto';  
import { Calc_CONCRETEGRANULOMETRY_Dto, Calc_CONCRETEGRANULOMETRY_Out } from '../dto/calc.granulometry.dto';

@ApiTags('concrete-granulometry')
@Controller('concrete/essays/granulometry')
export class ConcreteGranulometryController {
    private logger = new Logger(ConcreteGranulometryController.name);

    constructor(private readonly concretegranulometryService: ConcreteGranulometryService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma granulometria de ensaio de concreto com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma granulometria de ensaio de concreto com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma granulometria de ensaio de concreto com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma granulometria de ensaio de concreto com os dados enviados.' })
    async verifyInitConcreteGranulometry(@Res() response: Response, @Body() body: ConcreteGranulometryInitDto) {
        this.logger.log('verify init concrete granulometry > [body]');

        const status = await this.concretegranulometryService.verifyInitGranulometry(body);

        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da granulometria de ensaio de concreto com os dados enviados.' })
    @ApiBody({ type: Calc_CONCRETEGRANULOMETRY_Dto })
    @ApiResponse({
        status: 200,
        description: 'Resultados da granulometria de ensaio de concreto calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({ status: 400, description: 'Erro ao calcular os resultados da granulometria de ensaio de concreto com os dados enviados.' })
    async calculateConcreteGranulometry(@Body() body:  Calc_CONCRETEGRANULOMETRY_Dto) {
        this.logger.log('calculate concrete granulometry > [body]');

        const granulometry = await this.concretegranulometryService.calculateGranulometry(body);

        if (granulometry.success) this.logger.log('calculate concrete granulometry > [success]');
        else this.logger.error('calculate concrete granulometry > [error]');

        return granulometry;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da granulometria de ensaio de concreto no banco de dados.' })
    @ApiResponse({
        status: 200,
        description: 'Dados da granulometria de ensaio de concreto salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não foi possível salvar os dados da granulometria de ensaio de concreto no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'Granulometry with name "Granulometry 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao salvar os dados da granulometria de ensaio de concreto no banco de dados.' })
    async saveConcreteEssay(@Res() response: Response, @Body() body: Calc_CONCRETEGRANULOMETRY_Dto & Calc_CONCRETEGRANULOMETRY_Out) {
        this.logger.log('save concrete essay > [body]');

        const granulometry = await this.concretegranulometryService.saveEssay(body);

        if (granulometry.success) this.logger.log('save concrete granulometry essay > [success]');
        else this.logger.error('save concrete granulometry essay > [error]');

        return response.status(200).json(granulometry);
    }
}

import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ABCPService } from '../service';
import { ABCPInitDto } from '../dto/abcp-init.dto';

@ApiTags('abcp')
@Controller('concrete/dosages/abcp')
export class ABCPController {
    private logger = new Logger(ABCPController.name);

    constructor(private readonly abcpService: ABCPService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma ABCP com os dados enviados.' })
    @ApiResponse({
        status: 200,
        description: 'É possível criar uma ABCP com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    })
    @ApiResponse({
        status: 200,
        description: 'Não é possível criar uma ABCP com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Erro ao verificar se é possível criar uma ABCP com os dados enviados.' })
    async verifyInitABCP(@Res() response: Response, @Body() body: ABCPInitDto) {
        this.logger.log('verify init abcp > [body]');

        const status = await this.abcpService.verifyInitABCP(body);

        return response.status(200).json(status);
    }

    @Get('material-selection/:id')
    @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.' })
    @ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
    @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
    async getAllByUserId(@Param('id') userId: string) {
        this.logger.log(`get all materials by user id > [id]: ${userId}`);

        return await this.abcpService.getAllMaterials(userId);
    }
}
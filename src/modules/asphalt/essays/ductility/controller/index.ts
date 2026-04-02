import { Body, Controller, Logger, Post, Res, Get, Param } from "@nestjs/common";
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DuctilityService } from "../service";
import { Calc_DUCTILITY_Dto, Calc_DUCTILITY_Out } from "../dto/calc.ductility.dto";
import { DuctilityInitDto } from "../dto/ductility-init.dto";

@ApiTags('ductility')
@Controller('asphalt/essays/ductility')
export class DuctilityController {
    private logger = new Logger(DuctilityController.name);

    constructor(private readonly ductilityService: DuctilityService) { }

    @Post('verify-init')
    @ApiOperation({ summary: 'Verifica se é possível criar uma DUCTILITY com os dados enviados.' })
    async verifyInitDuctility(@Res() response: Response, @Body() body: DuctilityInitDto) {
        const status = await this.ductilityService.verifyInitDuctility(body);
        return response.status(200).json(status);
    }

    @Post('calculate-results')
    @ApiOperation({ summary: 'Calcula os resultados da DUCTILITY com os dados enviados.' })
    async calculateDuctility(@Body() body: Calc_DUCTILITY_Dto) {
        const ductility = await this.ductilityService.calculateDuctility(body);
        return ductility;
    }

    @Post('save-essay')
    @ApiOperation({ summary: 'Se possível, salva os dados da DUCTILITY no banco de dados.' })
    async saveEssay(@Res() response: Response, @Body() body: Calc_DUCTILITY_Dto & Calc_DUCTILITY_Out) {
        const ductility = await this.ductilityService.saveEssay(body);
        return response.status(200).json(ductility);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Busca todos os ensaios de ductilidade do usuário' })
    async getEssaysByUser(@Param('userId') userId: string, @Res() response: Response) {
        const essays = await this.ductilityService.getAllEssaysByUser(userId);
        return response.status(200).json({
            success: true,
            data: essays,
            count: essays.length
        });
    }

    @Get('material/:materialId')
    @ApiOperation({ summary: 'Busca todos os ensaios de ductilidade por material' })
    async getEssaysByMaterial(@Param('materialId') materialId: string, @Res() response: Response) {
        const essays = await this.ductilityService.getAllEssaysByMaterial(materialId);
        return response.status(200).json({
            success: true,
            data: essays,
            count: essays.length
        });
    }

    @Get('debug/all')
    @ApiOperation({ summary: 'DEBUG: Lista todos os ensaios de ductilidade' })
    async debugGetAllEssays(@Res() response: Response) {
        const essays = await this.ductilityService.getAllEssays();
        
        const formattedEssays = essays.map(essay => ({
            id: essay._id,
            name: essay.generalData?.name,
            userId: essay.generalData?.userId,
            materialId: essay.generalData?.material?._id,
            materialName: essay.generalData?.material?.name,
            results: essay.results
        }));
        
        return response.status(200).json({
            total: essays.length,
            essays: formattedEssays
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um ensaio de ductilidade específico por ID' })
    async getEssayById(@Param('id') id: string, @Res() response: Response) {
        const essay = await this.ductilityService.getEssayById(id);
        
        if (!essay) {
            return response.status(404).json({
                success: false,
                error: `Essay with ID ${id} not found`
            });
        }
        
        return response.status(200).json({
            success: true,
            data: essay
        });
    }
}
import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MaterialsService } from '../service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateConcreteMaterialDto } from '../dto/create-concrete-material.dto';
import { User } from '../../../../config/decorators/user.decorator';
import { Material } from '../schemas';

@ApiTags('materials')
@Controller('concrete/materials')
export class MaterialsController {
  private logger = new Logger(MaterialsController.name);

  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um material no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Material criado com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar material!' })
  async createMaterial(@Body() material: CreateConcreteMaterialDto) {
    this.logger.log('create material > [body]');

    const createdMaterial = await this.materialsService.createMaterial(material);

    if (createdMaterial) this.logger.log(`material created > [id]: ${createdMaterial._id}`);

    return createdMaterial;
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all materials by user id > [id]: ${userId}`);

    const materials = await this.materialsService.getAllMaterials(userId);

    return materials;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um material do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Material encontrado com sucesso!' })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  async getMaterialById(@Param('id') materialId: string) {
    this.logger.log(`get material by id > [id]: ${materialId}`);

    return this.materialsService.getMaterial(materialId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um material do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Material atualizado com sucesso!' })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  async updateMaterialById(@Param('id') materialId: string, @Body() material: Material) {
    this.logger.log(`update material by id > [id]: ${materialId}`);

    return this.materialsService.updateMaterial(material);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um material do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Material deletado com sucesso!' })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  async deleteMaterialById(@Param('id') materialId: string) {
    this.logger.log(`delete material by id > [id]: ${materialId}`);

    return this.materialsService.deleteMaterial(materialId);
  }
}

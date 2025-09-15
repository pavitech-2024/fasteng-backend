import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MaterialsService } from '../service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateConcreteMaterialDto } from '../dto/create-concrete-material.dto';
import { User } from '../../../../config/decorators/user.decorator';
import { Material } from '../schemas';
import { ConcreteMaterialResponseDto } from '../dto/create-concrete-response.dto';

@ApiTags('materials')
@Controller('concrete/materials')
export class MaterialsController {
  private logger = new Logger(MaterialsController.name);

  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um material no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Material criado com sucesso!', type: ConcreteMaterialResponseDto })
  @ApiResponse({ status: 400, description: 'Erro ao criar material!' })
  @ApiParam({
  name: 'id',
  description: 'ID do material',
  required: true,
  example: '64f0c12a3d5e2b001234abcd',
})
  @ApiBody({ type: CreateConcreteMaterialDto })
  async createMaterial(@Body() material: CreateConcreteMaterialDto, @User('userId') userId: string) {
    this.logger.log('create material > [body]');

    const createdMaterial = await this.materialsService.createMaterial(material);

    if (createdMaterial) this.logger.log(`material created > [id]: ${createdMaterial._id}`);

    return createdMaterial;
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!', type: ConcreteMaterialResponseDto })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  @ApiParam({
  name: 'id',
  description: 'ID do usuário dono dos materiais',
  example: 'user-12345', 
  type: String,
})
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all materials by user id > [id]: ${userId}`);

    const materials = await this.materialsService.getAllMaterials(userId);

    return materials;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um material do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Material encontrado com sucesso!', type: ConcreteMaterialResponseDto })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  @ApiParam({
  name: 'id',
  description: 'ID do material que deseja buscar',
  example: '64f0c12a3d5e2b001234abcd', // exemplo de ID válido
  type: String,
})
  async getMaterialById(@Param('id') materialId: string) {
    this.logger.log(`get material by id > [id]: ${materialId}`);

    return this.materialsService.getMaterial(materialId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um material do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Material atualizado com sucesso!', type: ConcreteMaterialResponseDto })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  @ApiParam({
  name: 'id',
  description: 'ID do material que deseja atualizar',
  example: '64f0c12a3d5e2b001234abcd', 
  type: String,
})
  @ApiBody({ type: CreateConcreteMaterialDto })
  async updateMaterialById(@Param('id') materialId: string, @Body() material: Material) {
    this.logger.log(`update material by id > [id]: ${materialId}`);

    return this.materialsService.updateMaterial(material);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um material do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Material deletado com sucesso!', type: ConcreteMaterialResponseDto })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  @ApiParam({
  name: 'id',
  description: 'ID do material que deseja deletar',
  example: '64f0c12a3d5e2b001234abcd', 
  type: String,
})
  async deleteMaterialById(@Param('id') materialId: string) {
    this.logger.log(`delete material by id > [id]: ${materialId}`);

    return this.materialsService.deleteMaterial(materialId);
  }
}

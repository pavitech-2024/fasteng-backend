import { Body, Controller, Logger, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { MaterialsService } from '../service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAsphaltMaterialDto, DescriptionDto } from '../dto/create-asphalt-material.dto';
import { Material } from '../schemas';
import { User } from '../../../../config/decorators/user.decorator';
import { ResponseAsphaltMaterialDto } from '../dto/create-asphalt-response.dto';
import { create } from 'domain';
import { UpdateAsphaltMaterialDto } from '../dto/update-asphalt-materialDto';

@ApiTags('materials')
@Controller('asphalt/materials')
export class MaterialsController {
  private logger = new Logger(MaterialsController.name);

  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um material no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Material criado com sucesso!', type: ResponseAsphaltMaterialDto })
  @ApiResponse({ status: 400, description: 'Erro ao criar material!' })
  async createMaterial(@Body() material: CreateAsphaltMaterialDto, @User('userId') userId: string) {
    this.logger.log('create material > [body]');

    const createdMaterial = await this.materialsService.createMaterial(material, userId);

    if (createdMaterial) this.logger.log(`material created > [id]: ${createdMaterial._id}`);

    return createdMaterial;
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário.' })
  //@ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
   @ApiResponse({
    status: 200,
    description: 'Materiais encontrados com sucesso!',
    type: ResponseAsphaltMaterialDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserIdList(@Param('id') userId: string) { //Antigo método getAllByUserId
    this.logger.log(`get all materials by user id > [id]: ${userId}`);

    const materials = await this.materialsService.getAllMaterialsList(userId);
  
    // Garante que sempre retornará um array
    if (!Array.isArray(materials)) {
      return [materials].filter(Boolean); // Converte para array e remove valores nulos
    }
    
    return materials;

  }

   @Get('all/:id')
  @ApiOperation({ summary: 'Retorna todos os materiais do banco de dados de um usuário.' })
  //@ApiResponse({ status: 200, description: 'Materiais encontrados com sucesso!' })
   @ApiResponse({
    status: 200,
    description: 'Materiais encontrados com sucesso!',
    type: ResponseAsphaltMaterialDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  async getAllByUserId(@Param('id') userId: string) {
    this.logger.log(`get all materials by user id > [id]: ${userId}`);
    

    return this.materialsService.getAllMaterials(userId);
  }

  
  @Get(':id')
  @ApiOperation({ summary: 'Retorna um material do banco de dados.' })
  //@ApiResponse({ status: 200, description: 'Material encontrado com sucesso!' })
   @ApiResponse({
    status: 200,
    description: 'Material encontrado com sucesso!',
    type: ResponseAsphaltMaterialDto,
  })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  async getMaterialById(@Param('id') materialId: string) {
    this.logger.log(`get material by id > [id]: ${materialId}`);

    return this.materialsService.getMaterial(materialId);
  }

  @Get('selected/:id')
  @ApiOperation({ summary: 'Retorna um material do banco de dados.' })
  @ApiResponse({ status: 200, description: 'Material encontrado com sucesso!', type: ResponseAsphaltMaterialDto})
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  async getSelectedMaterialsById(@Param('id') ids: string) {
    this.logger.log(`get material by id > [id]: ${typeof ids}`);

    return this.materialsService.getSelectedMaterialsById(ids);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um material do banco de dados.' })
  //@ApiResponse({ status: 200, description: 'Material atualizado com sucesso!' })
  @ApiResponse({
    status: 200,
    description: 'Material atualizado com sucesso!',
    type: ResponseAsphaltMaterialDto,
  })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  async updateMaterialById(@Param('id') materialId: string, @Body() material: Material) {
    this.logger.log(`update material by id > [id]: ${materialId}`);

    return this.materialsService.updateMaterial(material);
  }
  

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um material do banco de dados.' })
  //@ApiResponse({ status: 200, description: 'Material deletado com sucesso!' })
  @ApiResponse({
    status: 200,
    description: 'Material deletado com sucesso!',
    type: ResponseAsphaltMaterialDto,
  })
  @ApiResponse({ status: 400, description: 'Material não encontrado!' })
  async deleteMaterialById(@Param('id') materialId: string) {
    this.logger.log(`delete material by id > [id]: ${materialId}`);

    return this.materialsService.deleteMaterial(materialId);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../repository';
import { CreateAsphaltMaterialDto } from '../dto/create-asphalt-material.dto';
import { AlreadyExists, NotFound } from '../../../../utils/exceptions';
import { Material } from '../schemas';
import { GetEssaysByMaterial_Service } from './get-essays-by-material.service';

@Injectable()
export class MaterialsService {
  private logger = new Logger(MaterialsService.name);

  constructor(
    private readonly materialsRepository: MaterialsRepository,
    private readonly getEssaysByMaterial_Service: GetEssaysByMaterial_Service
  ) {}

  async createMaterial(material: CreateAsphaltMaterialDto, userId: string) {
    try {
      // verifica se já existe um material com o mesmo nome no banco de dados
      if (await this.materialsRepository.findOne({ name: material.name, userId }))
        throw new AlreadyExists(`Material with name "${material.name}"`);

      this.logger.log(userId);

      const createdMaterial = await this.materialsRepository.create({
        ...material,
        createdAt: new Date(),
        userId,
      });

      // cria um material no banco de dados
      return createdMaterial
    } catch (error) {
      this.logger.error(`error on create material > [error]: ${error}`);
      throw error;
    }
  }

  async getMaterial(materialId: string): Promise<any> {
    try {
      // busca um material com o id passado no banco de dados
      const material = await this.materialsRepository.findOne({ _id: materialId });

      // se não encontrar o material, retorna um erro
      if (!material) throw new NotFound('Material');

      // Buscar os ensaios com esse material;
      const essays = await this.getEssaysByMaterial_Service.getEssaysByMaterial(material)

      // retorna o material encontrado
      return { material, essays };
    } catch (error) {
      this.logger.error(`error on get material > [error]: ${error}`);

      throw error;
    }
  }

  async getAllMaterials(userId: string): Promise<Material[]> {
    try {
      // busca todos os materiais no banco de dados
      const materials = await this.materialsRepository.findByType({
        type: { $in: ['filler', 'CAP', 'asphaltBinder', 'coarseAggregate', 'fineAggregate'] },
      });

      // retorna os materiais encontrados que pertencem ao usuário
      return materials;
    } catch (error) {
      this.logger.error(`error on get all materials > [error]: ${error}`);
      throw error;
    }
  }

  async updateMaterial(material: Material): Promise<Material> {
    try {
      // busca um material com o id passado no banco de dados
      const materialToUpdate = await this.materialsRepository.findOne({ _id: material._id });

      // se não encontrar o material, retorna um erro
      if (!materialToUpdate) throw new NotFound('Material');

      // atualiza o material no banco de dados
      return this.materialsRepository.findOneAndUpdate({ _id: material._id }, material);
    } catch (error) {
      this.logger.error(`error on update material > [error]: ${error}`);

      throw error;
    }
  }

  async deleteMaterial(materialId: string): Promise<Material> {
    try {
      // busca um material com o id passado no banco de dados
      const material = await this.materialsRepository.findOne({ _id: materialId });

      // se não encontrar o material, retorna um erro
      if (!material) throw new NotFound('Material');

      // deleta o material do banco de dados
      return this.materialsRepository.findOneAndDelete({ _id: materialId });
    } catch (error) {
      this.logger.error(`error on delete material > [error]: ${error}`);

      throw error;
    }
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MaterialsRepository } from '../repository';
import { CreateAsphaltMaterialDto } from '../dto/create-asphalt-material.dto';
import { AlreadyExists, NotFound } from '../../../../utils/exceptions';
import { Material } from '../schemas';
import { GetEssaysByMaterial_Service } from './get-essays-by-material.service';
import { FwdRepository } from 'modules/asphalt/essays/fwd/repository';
import { IggRepository } from 'modules/asphalt/essays/igg/repository';
import { RtcdRepository } from 'modules/asphalt/essays/rtcd/repository';
import { DduiRepository } from 'modules/asphalt/essays/ddui/repository';
import { Igg } from 'modules/asphalt/essays/igg/schemas';
import { Fwd } from 'modules/asphalt/essays/fwd/schema';
import { Ddui } from 'modules/asphalt/essays/ddui/schemas';
import { Rtcd } from 'modules/asphalt/essays/rtcd/schemas';

export interface AsphaltMaterialsList {
  materials: Material[],
  iggEssays: Igg[],
  fwdEssays: Fwd[],
  dduiEssays: Ddui[],
  rtcdEssays: Rtcd[]
}

@Injectable()
export class MaterialsService {
  private logger = new Logger(MaterialsService.name);

  constructor(
    private readonly materialsRepository: MaterialsRepository,
    private readonly getEssaysByMaterial_Service: GetEssaysByMaterial_Service,
    private readonly fwdRepository: FwdRepository,
    private readonly iggRepository: IggRepository,
    private readonly rtcdRepository: RtcdRepository,
    private readonly dduiRepository: DduiRepository,
  ) {}

  async createMaterial(material: CreateAsphaltMaterialDto) {
    this.logger.log('create material > [body]');
    const { name} = material;
    const materialExists = await this.materialsRepository.findOne({ name /*userId*/ });
    if (materialExists)
      throw new AlreadyExists(`Material with name "${material.name}"`);

    const createdMaterial = await this.materialsRepository.create({
      ...material,
      createdAt: new Date(),
      //userId,
    });

    return createdMaterial;
  }

  async getMaterial(materialId: string): Promise<any> {
    try {
      // busca um material com o id passado no banco de dados
      const material = await this.materialsRepository.findOne({ _id: materialId });

      // se não encontrar o material, retorna um erro
      if (!material) throw new NotFound('Material');

      // Buscar os ensaios com esse material;
      const essays = await this.getEssaysByMaterial_Service.getEssaysByMaterial(material);

      // retorna o material encontrado
      return { material, essays };
    } catch (error) {
      this.logger.error(`error on get material > [error]: ${error}`);

      throw error;
    }
  }

  /**
   * Busca materiais selecionados pelo id e seus respectivos ensaios.
   * @param ids Ids dos materiais separados por vírgula.
   * @returns Um objeto com os materiais encontrados e seus respectivos ensaios.
   */
  async getSelectedMaterialsById(ids: string): Promise<{ materials: Material[]; essays: any[] }> {
    const materialIds = Array.from(new Set(ids.split(',').map((id) => id.trim())));

    try {
      const materials = await this.materialsRepository.findSelectedById(materialIds);
      const essaysPromises = materials.map((material) => this.getEssaysByMaterial_Service.getEssaysByMaterial(material));
      const essays = await Promise.all(essaysPromises);

      return { materials, essays };
    } catch (error) {
      this.logger.error(`error on get materials and essays by id > [error]: ${error}`);

      throw error;
    }
  }

  async getAllMaterialsList(userId: string): Promise<AsphaltMaterialsList> {
    try {
      // busca todos os materiais no banco de dados
      const materials = await this.materialsRepository.findByType(
        { $in: ['filler', 'CAP', 'asphaltBinder', 'coarseAggregate', 'fineAggregate'] },
        userId,
      );

      const fwdEssays = await this.fwdRepository.findAllByUserId(userId);
      const iggEssays = await this.iggRepository.findAllByUserId(userId);
      const rtcdEssays = await this.rtcdRepository.findAllByUserId(userId);
      const dduiEssays = await this.dduiRepository.findAllByUserId(userId)

      // retorna os materiais encontrados que pertencem ao usuário
      return {
        materials,
        fwdEssays,
        iggEssays,
        rtcdEssays,
        dduiEssays
      };
    } catch (error) {
      this.logger.error(`error on get all materials > [error]: ${error}`);
      throw error;
    }
  }

  async getAllMaterials(userId: string): Promise<Material[]> {
    try {
      // busca todos os materiais no banco de dados
      const materials = await this.materialsRepository.findByType(
        { $in: ['filler', 'CAP', 'asphaltBinder', 'coarseAggregate', 'fineAggregate'] },
        userId,
      );

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
      //return this.materialsRepository.findOneAndUpdate({ _id: material._id }, material);
      return this.materialsRepository.findOneAndUpdate({ _id: material._id }, material, { new: true });
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

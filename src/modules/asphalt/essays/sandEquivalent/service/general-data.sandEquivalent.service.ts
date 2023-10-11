import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "utils/exceptions";
import { SandEquivalentInitDto } from "../dto/init-sandEquivalent.dto";
import { SandEquivalentRepository } from "../repository";

@Injectable()
export class GeneralData_SandEquivalent_Service {
  private logger = new Logger(GeneralData_SandEquivalent_Service.name);

  constructor(
    private readonly sandEquivalentRepository: SandEquivalentRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitSandEquivalent({ name, material }: SandEquivalentInitDto) {
    try {
      this.logger.log('verify init sand equivalent on general-data.sandEquivalent.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of sand equivalent');

      // verificar se existe uma sandEquivalent com mesmo nome e materialId no banco de dados
      const sandEquivalentExists = await this.sandEquivalentRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (sandEquivalentExists) throw new AlreadyExists(`SandEquivalent with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
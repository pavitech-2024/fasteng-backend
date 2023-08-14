import { Logger } from "@nestjs/common";
import { SandSwellingRepository } from "../repository";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { SandSwellingInitDto } from "../dto/sand-swelling-init.dto";
import { AlreadyExists, NotFound } from "utils/exceptions";

export class GeneralData_SandSwelling_Service {
  private logger = new Logger(GeneralData_SandSwelling_Service.name);

  constructor(
    private readonly sandSwellingRepository: SandSwellingRepository,
    private readonly materialsRepository: MaterialsRepository,
  ){}

  async verifyInitSandSwelling({ name, material }: SandSwellingInitDto) {
    try {
      this.logger.log('verify init sand swelling on general-data.sand-swelling.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Sand Swelling');

      // verificar se existe uma cbr com mesmo nome e materialId no banco de dados
      const sandSwellingExists = await this.sandSwellingRepository.findOne({ generalData: { name, material: { _id: material._id } } });

      // se existir, retorna erro
      if (sandSwellingExists) throw new AlreadyExists(`Sand Swelling with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

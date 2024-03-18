import { Injectable, Logger } from "@nestjs/common";
import { SandIncreaseRepository } from "../repository";
import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { AlreadyExists, NotFound } from "../../../../../utils/exceptions";
import { SandIncreaseInitDto } from "../dto/sand-increase-init.dto";

@Injectable()
export class GeneralData_SandIncrease_Service {
  private logger = new Logger(GeneralData_SandIncrease_Service.name);

  constructor(
    private readonly sandIncreaseRepository: SandIncreaseRepository,
    private readonly materialsRepository: MaterialsRepository,
  ){}

  async verifyInitSandIncrease({ name, material }: SandIncreaseInitDto) {
    try {
      this.logger.log('verify init sand swelling on general-data.sand-swelling.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Sand Increase');

      // verificar se existe uma cbr com mesmo nome e materialId no banco de dados
      const sandIncreaseExists = await this.sandIncreaseRepository.findOne({ generalData: { name, material: { _id: material._id } } });

      // se existir, retorna erro
      if (sandIncreaseExists) throw new AlreadyExists(`Sand Increase with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

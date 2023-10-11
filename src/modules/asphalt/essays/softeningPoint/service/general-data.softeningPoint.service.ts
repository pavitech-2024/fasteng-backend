import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "utils/exceptions";
import { SofteningPointInitDto } from "../dto/init-softeningPoint.dto";
import { SofteningPointRepository } from "../repository";

@Injectable()
export class GeneralData_SofteningPoint_Service {
  private logger = new Logger(GeneralData_SofteningPoint_Service.name);

  constructor(
    private readonly softeningPointRepository: SofteningPointRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitSofteningPoint({ name, material }: SofteningPointInitDto) {
    try {
      this.logger.log('verify init softening point on general-data.softeningPoint.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of softening point');

      // verificar se existe uma softeningPoint com mesmo nome e materialId no banco de dados
      const softeningPointExists = await this.softeningPointRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (softeningPointExists) throw new AlreadyExists(`Softening point with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
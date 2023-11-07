import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from '../../../materials/repository';
import { NotFound, AlreadyExists } from "../../../../../utils/exceptions";
import { AdhesivenessRepository } from "../repository";
import { AdhesivenessInitDto } from "../dto/adhesiveness-init.dto";

@Injectable()
export class GeneralData_Adhesiveness_Service {
  private logger = new Logger(GeneralData_Adhesiveness_Service.name);

  constructor(
    private readonly adhesivenessRepository: AdhesivenessRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitAdhesiveness({ name, material }: AdhesivenessInitDto) {
    try {
      this.logger.log('verify init adhesiveness on general-data.adhesiveness.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Adhesiveness');

      // verificar se existe uma adhesiveness com mesmo nome e materialId no banco de dados
      const adhesivenessExists = await this.adhesivenessRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (adhesivenessExists) throw new AlreadyExists(`Adhesiveness with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

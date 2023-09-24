import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "utils/exceptions";
import { PenetrationInitDto } from "../dto/penetration-init.dto";
import { PenetrationRepository } from "../repository";

@Injectable()
export class GeneralData_Penetration_Service {
  private logger = new Logger(GeneralData_Penetration_Service.name);

  constructor(private readonly penetrationRepository: PenetrationRepository, private readonly materialRepository: MaterialsRepository) {}

  async verifyInitPenetration({ name, material }: PenetrationInitDto) {
    try {
      this.logger.log('verify init penetration on general-data.penetration.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Penetration');

      // verificar se existe uma penetration com mesmo nome e materialId no banco de dados
      const penetrationExists = await this.penetrationRepository.findOne({ generalData: { name, material: { _id: material._id } } });

      // se existir, retorna erro
      if (penetrationExists) throw new AlreadyExists(`Penetration with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
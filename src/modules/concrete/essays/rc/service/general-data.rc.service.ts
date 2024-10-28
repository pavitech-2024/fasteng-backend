import { Injectable, Logger } from "@nestjs/common";
import { NotFound, AlreadyExists } from "utils/exceptions";
import { ConcreteRcInitDto } from "../dto/concretert-init.dto";
import { ConcreteRCRepository } from "../respository";
import { MaterialsRepository } from "modules/concrete/materials/repository";

@Injectable()
export class GeneralData_CONCRETERC_Service {
  private logger = new Logger(GeneralData_CONCRETERC_Service.name);

  constructor(private readonly rcRepository: ConcreteRCRepository, private readonly materialRepository: MaterialsRepository) {}

  async verifyInitRc({ name, material }: ConcreteRcInitDto) {
    try {
      this.logger.log('verify init rc on general-data.rc.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of RC');

      // verificar se existe uma rc com mesmo nome e materialId no banco de dados
      const rcExists = await this.rcRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id,
      });
      // se existir, retorna erro
      if (rcExists) throw new AlreadyExists(`RC with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

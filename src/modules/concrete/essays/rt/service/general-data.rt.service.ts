import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { NotFound, AlreadyExists } from "utils/exceptions";
import { ConcreteRtInitDto } from "../dto/concretert-init.dto";
import { ConcreteRtRepository } from "../repository";

@Injectable()
export class GeneralData_CONCRETERT_Service {
  private logger = new Logger(GeneralData_CONCRETERT_Service.name);

  constructor(private readonly rtRepository: ConcreteRtRepository, private readonly materialRepository: MaterialsRepository) {}

  async verifyInitRt({ name, material }: ConcreteRtInitDto) {
    try {
      this.logger.log('verify init rt on general-data.rt.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of RT');

      // verificar se existe uma rt com mesmo nome e materialId no banco de dados
      const rtExists = await this.rtRepository.findOne({ generalData: { name, material: { _id: material._id } } });

      // se existir, retorna erro
      if (rtExists) throw new AlreadyExists(`RT with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

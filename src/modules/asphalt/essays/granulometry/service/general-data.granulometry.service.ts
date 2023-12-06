import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from '../../../materials/repository';
import { NotFound, AlreadyExists } from "../../../../../utils/exceptions";
import { AsphaltGranulometryRepository } from "../repository";
import { AsphaltGranulometryInitDto } from "../dto/asphalt.granulometry-init.dto";

@Injectable()
export class GeneralData_AsphaltGranulometry_Service {
  private logger = new Logger(GeneralData_AsphaltGranulometry_Service.name);

  constructor(private readonly granulometryRepository: AsphaltGranulometryRepository, private readonly materialRepository: MaterialsRepository) {}

  async verifyInitGranulometry({ name, material }: AsphaltGranulometryInitDto) {
    try {
      this.logger.log('verify init granulometry on general-data.granulometry.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of GRANULOMETRY');

      // verificar se existe uma granulometry com mesmo nome e materialId no banco de dados
      const granulometryExists = await this.granulometryRepository.findOne({ generalData: { name, material: { _id: material._id } } });

      // se existir, retorna erro
      if (granulometryExists) throw new AlreadyExists(`GRANULOMETRY with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
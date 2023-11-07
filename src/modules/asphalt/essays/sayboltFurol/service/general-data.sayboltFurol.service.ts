import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "../../../../../utils/exceptions";
import { SayboltFurolInitDto } from "../dto/init-sayboltFurol.dto";
import { SayboltFurolRepository } from "../repository";

@Injectable()
export class GeneralData_SayboltFurol_Service {
  private logger = new Logger(GeneralData_SayboltFurol_Service.name);

  constructor(
    private readonly sayboltFurolRepository: SayboltFurolRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitSayboltFurol({ name, material }: SayboltFurolInitDto) {
    try {
      this.logger.log('verify init saybolt-furol on general-data.sayboltFurol.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of saybolt-furol');

      // verificar se existe uma sayboltFurol com mesmo nome e materialId no banco de dados
      const sayboltFurolExists = await this.sayboltFurolRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (sayboltFurolExists) throw new AlreadyExists(`Saybolt-Furol with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
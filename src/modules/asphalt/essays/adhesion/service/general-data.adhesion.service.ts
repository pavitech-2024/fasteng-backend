import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "utils/exceptions";
import { AdhesionRepository } from "../repository";
import { AdhesionInitDto } from "../dto/adhesion-init.dto";

@Injectable()
export class GeneralData_Adhesion_Service {
  private logger = new Logger(GeneralData_Adhesion_Service.name);

  constructor(
    private readonly adhesionRepository: AdhesionRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitAdhesion({ name, material }: AdhesionInitDto) {
    try {
      this.logger.log('verify init adhesion on general-data.adhesion.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Adhesion');

      // verificar se existe uma adhesion com mesmo nome e materialId no banco de dados
      const adhesionExists = await this.adhesionRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (adhesionExists) throw new AlreadyExists(`Adhesion with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

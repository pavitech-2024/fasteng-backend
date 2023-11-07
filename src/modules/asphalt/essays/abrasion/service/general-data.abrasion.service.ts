import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "utils/exceptions";
import { AbrasionRepository } from "../repository";
import { AbrasionInitDto } from "../dto/abrasion-init.dto";

@Injectable()
export class GeneralData_Abrasion_Service {
  private logger = new Logger(GeneralData_Abrasion_Service.name);

  constructor(private readonly abrasionRepository: AbrasionRepository, private readonly materialRepository: MaterialsRepository) {}

  async verifyInitAbrasion({ name, material }: AbrasionInitDto) {
    try {
      this.logger.log('verify init abrasion on general-data.abrasion.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Abrasion');

      // verificar se existe uma abrasion com mesmo nome e materialId no banco de dados
      const abrasionExists = await this.abrasionRepository.findOne({ generalData: { name, material: { _id: material._id } } });

      // se existir, retorna erro
      if (abrasionExists) throw new AlreadyExists(`Abrasion with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
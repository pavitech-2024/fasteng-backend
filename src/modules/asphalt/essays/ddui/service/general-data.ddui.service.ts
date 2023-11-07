import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "../../../../../utils/exceptions";
import { DduiInitDto } from "../dto/init-ddui.dto";
import { DduiRepository } from "../repository";

@Injectable()
export class GeneralData_Ddui_Service {
  private logger = new Logger(GeneralData_Ddui_Service.name);

  constructor(
    private readonly dduiRepository: DduiRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitDdui({ name, material }: DduiInitDto) {
    try {
      this.logger.log('verify init ddui on general-data.ddui.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of ddui');

      // verificar se existe uma ddui com mesmo nome e materialId no banco de dados
      const dduiExists = await this.dduiRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (dduiExists) throw new AlreadyExists(`Ddui with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { NotFound, AlreadyExists } from "../../../../../utils/exceptions";
import { RtfoInitDto } from "../dto/rtfo-init.dto";
import { RtfoRepository } from "../repository";

@Injectable()
export class GeneralData_Rtfo_Service {
  private logger = new Logger(GeneralData_Rtfo_Service.name);

  constructor(
    private readonly rtfoRepository: RtfoRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitRtfo({ name, material }: RtfoInitDto) {
    try {
      this.logger.log('verify init rtfo on general-data.rtfo.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Rtfo');

      // verificar se existe uma rtfo com mesmo nome e materialId no banco de dados
      const rtfoExists = await this.rtfoRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (rtfoExists) throw new AlreadyExists(`Rtfo with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
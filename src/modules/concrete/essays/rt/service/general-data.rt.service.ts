import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { AlreadyExists } from "utils/exceptions";
import { ConcreteRtInitDto } from "../dto/concretert-init.dto";
import { ConcreteRtRepository } from "../repository";

@Injectable()
export class GeneralData_CONCRETERT_Service {
  private logger = new Logger(GeneralData_CONCRETERT_Service.name);

  constructor(private readonly rtRepository: ConcreteRtRepository) {}

  async verifyInitRt({ name }: ConcreteRtInitDto) {
    try {
      this.logger.log('verify init rt on general-data.rt.service.ts > [body]');

      // verificar se existe uma rt com mesmo nome no banco de dados
      const rtExists = await this.rtRepository.findOne({ generalData: { name } });

      // se existir, retorna erro
      if (rtExists) throw new AlreadyExists(`RT with name "${name}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

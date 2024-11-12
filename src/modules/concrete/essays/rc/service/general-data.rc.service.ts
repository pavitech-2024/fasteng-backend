import { Injectable, Logger } from "@nestjs/common";
import { AlreadyExists } from "utils/exceptions";
import { ConcreteRcInitDto } from "../dto/concretert-init.dto";
import { ConcreteRCRepository } from "../respository";

@Injectable()
export class GeneralData_CONCRETERC_Service {
  private logger = new Logger(GeneralData_CONCRETERC_Service.name);

  constructor(private readonly rcRepository: ConcreteRCRepository) {}

  async verifyInitRc({ name }: ConcreteRcInitDto) {
    try {
      this.logger.log('verify init rc on general-data.rc.service.ts > [body]');

      // verificar se existe uma rc com mesmo nome no banco de dados
      const rcExists = await this.rcRepository.findOne({
        "generalData.name": name,
      });

      // se existir, retorna erro
      if (rcExists) throw new AlreadyExists(`RC with name "${name}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

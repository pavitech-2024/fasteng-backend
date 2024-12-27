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
    const existingRt = await this.rtRepository.findOne({ generalData: { name } });

    if (existingRt) {
      throw new AlreadyExists(`RT with name "${name}"`);
    }

    return true;
  } catch (error) {
    throw error;
  }
}
}

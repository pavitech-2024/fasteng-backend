import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { ConcreteGranulometryRepository } from "modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "modules/concrete/essays/unitMass/repository";
import { ABCPRepository } from "../repository";
import { InsertParamsDataDto } from "../dto/save-insert-params.dto";

@Injectable()
export class InsertParams_ABCP_Service {
  private logger = new Logger(InsertParams_ABCP_Service.name)

  constructor(
    private readonly abcpRepository: ABCPRepository,
  ) { }

  async saveInsertParams(body: InsertParamsDataDto, userId: string) {
    try {
      this.logger.log('save abcp insert Params step on insert-params.abcp.service.ts > [body]', { body });

      const { name } = body.insertParamsData;

      const abcpExists = await this.abcpRepository.findOne({
        "generalData.name": name,
        "generalData.userId": userId,
      });

      await this.abcpRepository.saveStep(abcpExists, 4);

      return true;
    } catch (error) {
      throw error
    }
  }

}

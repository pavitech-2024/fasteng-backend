import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { ConcreteGranulometryRepository } from "modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "modules/concrete/essays/unitMass/repository";
import { ABCPRepository } from "../repository";
import { InsertParamsDataDto } from "../dto/save-insert-params.dto";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { ABCP, ABCPDocument } from "../schemas";

@Injectable()
export class InsertParams_ABCP_Service {
  private logger = new Logger(InsertParams_ABCP_Service.name)

  constructor(
    @InjectModel(ABCP.name, DATABASE_CONNECTION.CONCRETE) 
    private abcpModel: Model<ABCPDocument>,
    private readonly abcpRepository: ABCPRepository,
  ) { }

  async saveInsertParams(body: InsertParamsDataDto, userId: string) {
    try {
      this.logger.log('save abcp insert Params step on insert-params.abcp.service.ts > [body]', { body });

      const { name } = body.insertParamsData;
      console.log("🚀 ~ InsertParams_ABCP_Service ~ saveInsertParams ~ name:", name)

      const abcpExists: any = await this.abcpRepository.findOne(name, userId);
      console.log("🚀 ~ InsertParams_ABCP_Service ~ saveInsertParams ~ abcpExists:", abcpExists)

      const { name: paramsName, ...paramsDataWithoutName } = body.insertParamsData;
      const abcpWithParams = { ...abcpExists._doc, insertParamsData: paramsDataWithoutName };

      await this.abcpModel.updateOne(
        { "_id": abcpExists._id },
        abcpWithParams
      );

      await this.abcpRepository.saveStep(abcpExists._doc, 4);

      return true;
    } catch (error) {
      throw error
    }
  }

}

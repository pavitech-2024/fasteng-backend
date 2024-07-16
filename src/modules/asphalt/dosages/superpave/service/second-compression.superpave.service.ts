import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { SuperpaveRepository } from "../repository";
import { Superpave, SuperpaveDocument } from "../schemas";

@Injectable()
export class SecondCompression_Superpave_Service {
  private logger = new Logger(SecondCompression_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT) 
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository
  ) {}

  async calculateStep7RiceTest(body: any) {
    try {
      this.logger.log({body}, 'start calculateStep7RiceTest > SecondCompression_Superpave_Service');

      const {
        sampleAirDryMass,
        containerMassWaterSample,
        containerWaterMass,
        waterTemperatureCorrection
      } = body;

      const gmm = (sampleAirDryMass /
      (sampleAirDryMass + containerWaterMass - containerMassWaterSample)
    ) * waterTemperatureCorrection;

      return gmm
    } catch (error) {
      throw error
    }
  }

}
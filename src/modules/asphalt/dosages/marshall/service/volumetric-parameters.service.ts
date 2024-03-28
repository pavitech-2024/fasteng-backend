import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";


@Injectable()
export class VolumetricParameters_Marshall_Service {
  private logger = new Logger(VolumetricParameters_Marshall_Service.name)

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
  ){}

  async setVolumetricParameters(body: any) {
    try {
      this.logger.log('set volumetric parameters data on volumetric-parameters.marshall.service.ts > [body]', {
        body,
      });

      return {}
    } catch (error) {
      throw new Error('Failed to set volumetric parameters.');
    }
  }
}
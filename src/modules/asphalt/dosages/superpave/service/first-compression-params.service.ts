import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { SuperpaveRepository } from "../repository";
import { Superpave, SuperpaveDocument } from "../schemas";

@Injectable()
export class firstCompressionParamsData_Service {
  private logger = new Logger(firstCompressionParamsData_Service.name)

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT) 
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository
  ){}

}
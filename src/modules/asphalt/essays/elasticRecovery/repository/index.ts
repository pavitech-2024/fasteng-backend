import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { ElasticRecovery, ElasticRecoveryDocument } from "../schema";

export class ElasticRecoveryRepository {
  constructor(@InjectModel(ElasticRecovery.name, DATABASE_CONNECTION.ASPHALT) private elasticRecoveryModel: Model<ElasticRecoveryDocument>) {}

  async findOne(elasticRecoveryFilterQuery: any): Promise<ElasticRecovery> {
    return this.elasticRecoveryModel.findOne(elasticRecoveryFilterQuery);
  }

  async findAll(): Promise<ElasticRecovery[]> {
    return this.elasticRecoveryModel.find();
  }

  async create(elasticRecovery: any): Promise<ElasticRecovery> {
    const createdElasticRecovery = new this.elasticRecoveryModel(elasticRecovery);

    return createdElasticRecovery.save();
  }
}
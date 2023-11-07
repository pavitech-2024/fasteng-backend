import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { Adhesiveness, AdhesivenessDocument } from "../schemas";

export class AdhesivenessRepository {
  constructor(@InjectModel(Adhesiveness.name, DATABASE_CONNECTION.ASPHALT) private adhesivenessModel: Model<AdhesivenessDocument>) {}

  async findOne(adhesivenessFilterQuery: any): Promise<Adhesiveness> {
    return this.adhesivenessModel.findOne(adhesivenessFilterQuery);
  }

  async findAll(): Promise<Adhesiveness[]> {
    return this.adhesivenessModel.find();
  }

  async create(adhesiveness: any): Promise<Adhesiveness> {
    const createdAdhesiveness = new this.adhesivenessModel(adhesiveness);

    return createdAdhesiveness.save();
  }
}

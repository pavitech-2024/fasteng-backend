import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model, FilterQuery } from "mongoose";
import { AsphaltGranulometry, AsphaltGranulometryDocument } from "../schemas";

export class AsphaltGranulometryRepository {
  constructor(@InjectModel(AsphaltGranulometry.name, DATABASE_CONNECTION.ASPHALT) private granulometryModel: Model<AsphaltGranulometryDocument>) {}

  async findOne(granulometryFilterQuery: FilterQuery<AsphaltGranulometry>): Promise<AsphaltGranulometry> {
    return this.granulometryModel.findOne(granulometryFilterQuery);
  }

  async findAll(): Promise<AsphaltGranulometry[]> {
    return this.granulometryModel.find();
  }

  async create(granulometry: any): Promise<AsphaltGranulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}
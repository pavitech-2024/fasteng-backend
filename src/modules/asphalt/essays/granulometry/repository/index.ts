import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model, FilterQuery } from "mongoose";
import { AsphaltGranulometry, AsphaltGranulometryDocument } from "../schemas";

export class AsphaltGranulometryRepository {
  constructor(@InjectModel(AsphaltGranulometry.name, DATABASE_CONNECTION.ASPHALT) private granulometryModel: Model<AsphaltGranulometryDocument>) {}

  async findOne(granulometryFilterQuery: FilterQuery<AsphaltGranulometry>): Promise<AsphaltGranulometry> {
    console.log("🚀 ~ AsphaltGranulometryRepository ~ findOne ~ granulometryFilterQuery:", granulometryFilterQuery)
    const granulometry = await this.granulometryModel.findOne(granulometryFilterQuery);
    console.log("🚀 ~ AsphaltGranulometryRepository ~ findOne ~ granulometry:", granulometry)
    return granulometry
  }

  async findAll(): Promise<AsphaltGranulometry[]> {
    return this.granulometryModel.find();
  }

  async findById(ids: string[]): Promise<AsphaltGranulometry[]> {
    let granulometrys = [];

    ids.forEach(async (id) => {
      const granulometry = await this.granulometryModel.findById(id);
      
      if (granulometry) {
        granulometrys.push(granulometry)
      }
    })

    return granulometrys
  }

  async create(granulometry: any): Promise<AsphaltGranulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}
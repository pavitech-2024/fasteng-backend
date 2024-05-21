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

    for (const id of ids) {
      const granulometry = await this.granulometryModel.find({ "generalData.material._id": id }).lean();

      if (Array.isArray(granulometry) && granulometry.length > 0) {
        granulometrys.push(granulometry[0]);
      }
    }

    return granulometrys;
  }

  async create(granulometry: any): Promise<AsphaltGranulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}
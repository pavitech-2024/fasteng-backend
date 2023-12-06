import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";

export class MarshallRepository {
  constructor(@InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT) private marshallModel: Model<MarshallDocument>) { }

  async create(marshall: any): Promise<Marshall> {
    const createdMarshall = new this.marshallModel(marshall);
    return createdMarshall.save();
  }

  async find(): Promise<Marshall[]> {
    return this.marshallModel.find();
  }

  async findOne(MarshallFilterQuery: FilterQuery<Marshall>): Promise<Marshall> {
    return this.marshallModel.findOne(MarshallFilterQuery);
  }

  async findOneAndUpdate(marshallFilterQuery: FilterQuery<Marshall>, marshall: Partial<Marshall>): Promise<Marshall> {
    return this.marshallModel.findOneAndUpdate(marshallFilterQuery, marshall, {
      new: true,
    });
  }
}
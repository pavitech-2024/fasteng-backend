import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Superpave, SuperpaveDocument } from "../schemas";

export class SuperpaveRepository {
  constructor(@InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT) private superpaveModel: Model<SuperpaveDocument>) { }

  async create(superpave: any): Promise<Superpave> {
    const createdSuperpave = new this.superpaveModel(superpave);
    return createdSuperpave.save();
  }

  async find(): Promise<Superpave[]> {
    return this.superpaveModel.find();
  }

  async findOne(SuperpaveFilterQuery: FilterQuery<Superpave>): Promise<Superpave> {
    return this.superpaveModel.findOne(SuperpaveFilterQuery);
  }

  async findOneAndUpdate(superpaveFilterQuery: FilterQuery<Superpave>, superpave: Partial<Superpave>): Promise<Superpave> {
    return this.superpaveModel.findOneAndUpdate(superpaveFilterQuery, superpave, {
      new: true,
    });
  }
}

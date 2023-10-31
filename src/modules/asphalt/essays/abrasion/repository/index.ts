import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { Abrasion, AbrasionDocument } from "../schemas";

export class AbrasionRepository {
  constructor(@InjectModel(Abrasion.name, DATABASE_CONNECTION.ASPHALT) private abrasionModel: Model<AbrasionDocument>) {}

  async findOne(abrasionFilterQuery: any): Promise<Abrasion> {
    return this.abrasionModel.findOne(abrasionFilterQuery);
  }

  async findAll(): Promise<Abrasion[]> {
    return this.abrasionModel.find();
  }

  async create(abrasion: any): Promise<Abrasion> {
    const createdAbrasion = new this.abrasionModel(abrasion);

    return createdAbrasion.save();
  }
}
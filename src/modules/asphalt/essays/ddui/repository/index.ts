import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { Ddui, DduiDocument } from "../schemas";

export class DduiRepository {
  constructor(@InjectModel(Ddui.name, DATABASE_CONNECTION.ASPHALT) private dduiModel: Model<DduiDocument>) {}

  async findOne(dduiFilterQuery: any): Promise<Ddui> {
    return this.dduiModel.findOne(dduiFilterQuery);
  }

  async findAll(): Promise<Ddui[]> {
    return this.dduiModel.find();
  }

  async create(ddui: any): Promise<Ddui> {
    const createdDdui = new this.dduiModel(ddui);

    return createdDdui.save();
  }

  async findAllByUserId(id: string): Promise<Ddui[]> {
      return this.dduiModel.find({"generalData.userId": id});
    }
}
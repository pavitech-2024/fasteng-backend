import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { SandIncrease, SandIncreaseDocument } from "../schema";


export class SandIncreaseRepository {
  constructor(
    @InjectModel(SandIncrease.name, DATABASE_CONNECTION.CONCRETE)
    private sandIncreaseModel: Model<SandIncreaseDocument>,
  ) {}

  async findOne(sandIncreaseFilterQuery: FilterQuery<SandIncrease>): Promise<SandIncrease> {
    return this.sandIncreaseModel.findOne(sandIncreaseFilterQuery);
  }

  async create(sandIncrease: any): Promise<SandIncrease> {
    const createdSandIncrease = new this.sandIncreaseModel(sandIncrease);

    return createdSandIncrease.save();
  }
}

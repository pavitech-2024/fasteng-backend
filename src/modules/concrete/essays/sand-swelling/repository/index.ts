import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { SandSwelling, SandSwellingDocument } from "../schema";


export class SandSwellingRepository {
  constructor(
    @InjectModel(SandSwelling.name, DATABASE_CONNECTION.CONCRETE)
    private sandSwellingModel: Model<SandSwellingDocument>,
  ) {}

  async findOne(sandSwellingFilterQuery: any): Promise<SandSwelling> {
    return this.sandSwellingModel.findOne(sandSwellingFilterQuery);
  }

  async create(sandSwelling: any): Promise<SandSwelling> {
    const createdSandSwelling = new this.sandSwellingModel(sandSwelling);

    return createdSandSwelling.save();
  }
}

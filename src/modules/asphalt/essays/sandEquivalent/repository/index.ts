import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { SandEquivalent, SandEquivalentDocument } from "../schemas";

export class SandEquivalentRepository {
  constructor(@InjectModel(SandEquivalent.name, DATABASE_CONNECTION.ASPHALT) private sandEquivalentModel: Model<SandEquivalentDocument>) {}

  async findOne(sandEquivalentFilterQuery: any): Promise<SandEquivalent> {
    return this.sandEquivalentModel.findOne(sandEquivalentFilterQuery);
  }

  async findAll(): Promise<SandEquivalent[]> {
    return this.sandEquivalentModel.find();
  }

  async create(sandEquivalent: any): Promise<SandEquivalent> {
    const createdSandEquivalent = new this.sandEquivalentModel(sandEquivalent);

    return createdSandEquivalent.save();
  }
}
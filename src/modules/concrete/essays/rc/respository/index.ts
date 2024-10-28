import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model, FilterQuery } from "mongoose";
import { RC, RCDocument } from "../schemas";


export class ConcreteRCRepository {
  constructor(@InjectModel(RC.name, DATABASE_CONNECTION.CONCRETE) private rcModel: Model<RCDocument>) {}

  async findOne(rcFilterQuery: FilterQuery<RC>): Promise<RC> {
    return this.rcModel.findOne(rcFilterQuery);
  }

  async findById(id: string): Promise<RC> {
    return this.rcModel.findById(id);
  }

  async findAll(): Promise<RC[]> {
    return this.rcModel.find();
  }

  async findAllByMaterialId(unitMassFilterQuery: FilterQuery<RC>): Promise<RC[]> {
    return this.rcModel.find(unitMassFilterQuery);
  }

  async create(rc: any): Promise<RC> {
    const createdRC = new this.rcModel(rc);

    return createdRC.save();
  }
}
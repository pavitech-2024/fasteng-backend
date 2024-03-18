import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { SofteningPoint, SofteningPointDocument } from "../schemas";

export class SofteningPointRepository {
  constructor(@InjectModel(SofteningPoint.name, DATABASE_CONNECTION.ASPHALT) private softeningPointModel: Model<SofteningPointDocument>) {}

  async findOne(softeningPointFilterQuery: any): Promise<SofteningPoint> {
    return this.softeningPointModel.findOne(softeningPointFilterQuery);
  }

  async findAll(): Promise<SofteningPoint[]> {
    return this.softeningPointModel.find();
  }

  async create(softeningPoint: any): Promise<SofteningPoint> {
    const createdSofteningPoint = new this.softeningPointModel(softeningPoint);

    return createdSofteningPoint.save();
  }
}
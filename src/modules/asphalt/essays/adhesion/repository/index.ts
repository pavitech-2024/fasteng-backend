import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { Adhesion, AdhesionDocument } from "../schemas";

export class AdhesionRepository {
  constructor(@InjectModel(Adhesion.name, DATABASE_CONNECTION.ASPHALT) private adhesionModel: Model<AdhesionDocument>) {}

  async findOne(adhesionFilterQuery: any): Promise<Adhesion> {
    return this.adhesionModel.findOne(adhesionFilterQuery);
  }

  async findAll(): Promise<Adhesion[]> {
    return this.adhesionModel.find();
  }

  async create(adhesion: any): Promise<Adhesion> {
    const createdAdhesion = new this.adhesionModel(adhesion);

    return createdAdhesion.save();
  }
}

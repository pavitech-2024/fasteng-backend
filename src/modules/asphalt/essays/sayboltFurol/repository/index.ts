import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { SayboltFurol, SayboltFurolDocument } from "../schemas";

export class SayboltFurolRepository {
  constructor(@InjectModel(SayboltFurol.name, DATABASE_CONNECTION.ASPHALT) private sayboltFurolModel: Model<SayboltFurolDocument>) {}

  async findOne(sayboltFurolFilterQuery: any): Promise<SayboltFurol> {
    return this.sayboltFurolModel.findOne(sayboltFurolFilterQuery);
  }

  async findAll(): Promise<SayboltFurol[]> {
    return this.sayboltFurolModel.find();
  }

  async create(sayboltFurol: any): Promise<SayboltFurol> {
    const createdSayboltFurol = new this.sayboltFurolModel(sayboltFurol);

    return createdSayboltFurol.save();
  }
}
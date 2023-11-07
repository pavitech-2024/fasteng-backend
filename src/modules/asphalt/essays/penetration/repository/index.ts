import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { Penetration, PenetrationDocument } from "../schemas";


export class PenetrationRepository {
  constructor(@InjectModel(Penetration.name, DATABASE_CONNECTION.ASPHALT) private penetrationModel: Model<PenetrationDocument>) {}

  async findOne(penetrationFilterQuery: any): Promise<Penetration> {
    return this.penetrationModel.findOne(penetrationFilterQuery);
  }

  async findAll(): Promise<Penetration[]> {
    return this.penetrationModel.find();
  }

  async create(penetration: any): Promise<Penetration> {
    const createdPenetration = new this.penetrationModel(penetration);

    return createdPenetration.save();
  }
}

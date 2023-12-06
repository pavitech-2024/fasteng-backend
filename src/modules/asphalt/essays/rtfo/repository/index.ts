import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { Rtfo, RtfoDocument } from "../schemas";

export class RtfoRepository {
  constructor(@InjectModel(Rtfo.name, DATABASE_CONNECTION.ASPHALT) private rtfoModel: Model<RtfoDocument>) {}

  async findOne(rtfoFilterQuery: any): Promise<Rtfo> {
    return this.rtfoModel.findOne(rtfoFilterQuery);
  }

  async findAll(): Promise<Rtfo[]> {
    return this.rtfoModel.find();
  }

  async create(rtfo: any): Promise<Rtfo> {
    const createdRtfo = new this.rtfoModel(rtfo);

    return createdRtfo.save();
  }
}
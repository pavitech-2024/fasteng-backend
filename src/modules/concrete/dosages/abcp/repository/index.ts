import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { ABCP, ABCPDocument } from "../schemas";

export class ABCPRepository {
  constructor(@InjectModel(ABCP.name, DATABASE_CONNECTION.CONCRETE) private abcpModel: Model<ABCPDocument>) { }

  async find(): Promise<ABCP[]> {
    return this.abcpModel.find();
  }

  async findById(dosageId: string): Promise<ABCP> {
    return this.abcpModel.findById(dosageId)
  }

  async findOne(abcpFilterQuery: any): Promise<ABCP> {
    return this.abcpModel.findOne(abcpFilterQuery);
  }

  async create(abcp: any): Promise<ABCP> {
    const createdGranulometry = new this.abcpModel(abcp);

    return createdGranulometry.save();
  }

  async createPartialAbcp(name: string, userId: string): Promise<any> {
    try {
      const createdPartialAbcp = await this.abcpModel.create({
        generalData: {
          name,
          userId,
          step: 0
        },
      });
      return createdPartialAbcp;
    } catch (error) {
      console.error("Erro ao salvar o step:", error);
      throw error
    }
  }

  async saveStep(abcp: any, step: number): Promise<void> {
    try {
      await this.abcpModel.updateOne(
        { _id: abcp._id },
        { $set: { "generalData.step": step } }
      );
    } catch (error) {
      console.error("Erro ao salvar o passo:", error);
      throw error;
    }
  }
}
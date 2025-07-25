import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { ABCP, ABCPDocument } from "../schemas";

export class ABCPRepository {
  constructor(@InjectModel(ABCP.name, DATABASE_CONNECTION.CONCRETE) private abcpModel: Model<ABCPDocument>) { }

  async find(): Promise<ABCP[]> {
    const dosages =  await this.abcpModel.find().lean();

    return dosages
  }

  async findById(dosageId: string): Promise<ABCP> {
    const dosage = await this.abcpModel.findById(dosageId).lean();

    return dosage
  }

  async findOne(name: any, userId: string): Promise<ABCP> {

    const dosage = await this.abcpModel.findOne({
      "generalData.name": name,
      "generalData.userId": userId
    });
    
    return dosage;
  }

  async create(abcp: any): Promise<ABCP> {
    const createdGranulometry = new this.abcpModel(abcp);

    return createdGranulometry.save();
  }

  async createPartialAbcp(abcp: any, userId: string): Promise<any> {
    try {
      const createdPartialAbcp = await this.abcpModel.create({
        generalData: {...abcp, userId},
      });

      return createdPartialAbcp;
    } catch (error) {
      console.error("Erro ao salvar o step:", error);
      throw error
    }
  }

  async updatePartialAbcp(abcp: any, userId: string): Promise<any> {
    try {
      const createdPartialAbcp = await this.abcpModel.updateOne(
        { "generalData.name": abcp.data.name, "generalData.userId": userId },
        { $set: { generalData: abcp.data } }
      );

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

  async findOneAndDelete(dosage_id): Promise<any> {
    try {
      const deletedDosage = await this.abcpModel.findOneAndDelete({ _id: dosage_id });

      return deletedDosage
    } catch (error) {
      console.error("Erro ao deletar a dosagem:", error);
      throw error;
    }
  }
}
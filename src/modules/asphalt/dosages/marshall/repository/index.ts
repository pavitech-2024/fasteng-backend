import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";

export class MarshallRepository {
  constructor(@InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT) private marshallModel: Model<MarshallDocument>) { }

  async create(marshall: any): Promise<Marshall> {
    const createdMarshall = new this.marshallModel(marshall);
    return createdMarshall.save();
  }

  async find(): Promise<Marshall[]> {
    return this.marshallModel.find().sort({ createdAt: -1 });
  }

  async findOne(name: any, userId: string): Promise<Marshall> {
    const dosage = await this.marshallModel.findOne({
      "generalData.name": name,
      "generalData.userId": userId
    });
    
    return dosage;
  }

  async findOneAndUpdate(marshallFilterQuery: FilterQuery<Marshall>, marshall: Partial<Marshall>): Promise<Marshall> {
    return this.marshallModel.findOneAndUpdate(marshallFilterQuery, marshall, {
      new: true,
    });
  }

  async createPartialMarshall(marshall: any, userId: string): Promise<any> {
    try {
      const createdPartialMarshall = await this.marshallModel.create({
        generalData: {...marshall, userId},
      });

      return createdPartialMarshall;
    } catch (error) {
      console.error("Erro ao salvar o step:", error);
      throw error
    }
  }

  async saveStep(marshall: any, step: number): Promise<void> {
    try {
      await this.marshallModel.updateOne(
        { _id: marshall._id },
        { $set: { "generalData.step": step } }
      );
    } catch (error) {
      console.error("Erro ao salvar o passo:", error);
      throw error;
    }
  }
}
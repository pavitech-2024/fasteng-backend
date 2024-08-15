import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Superpave, SuperpaveDocument } from "../schemas";

export class SuperpaveRepository {
  constructor(@InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT) private superpaveModel: Model<SuperpaveDocument>) { }

  async create(superpave: any): Promise<Superpave> {
    const createdSuperpave = new this.superpaveModel(superpave);
    return createdSuperpave.save();
  }

  async find(): Promise<Superpave[]> {
    return this.superpaveModel.find().sort({ createdAt: -1 });
  };

  async findOne(name: any, userId: string): Promise<Superpave> {
    const dosage = await this.superpaveModel.findOne({
      "generalData.name": name,
      "generalData.userId": userId
    });
    
    return dosage;
  }

  async findOneAndUpdate(superpaveFilterQuery: FilterQuery<Superpave>, superpave: Partial<Superpave>): Promise<Superpave> {
    return this.superpaveModel.findOneAndUpdate(superpaveFilterQuery, superpave, {
      new: true,
    });
  }

  async createPartialSuperpave(superpave: any, userId: string): Promise<any> {
    try {
      const createdPartialSuperpave = await this.superpaveModel.create({
        generalData: {...superpave, userId},
      });

      return createdPartialSuperpave;
    } catch (error) {
      console.error("Erro ao salvar o step:", error);
      throw error
    }
  }

  async saveStep(superpave: any, step: number): Promise<void> {
    try {
      await this.superpaveModel.updateOne(
        { _id: superpave._id },
        { $set: { "generalData.step": step } }
      );
    } catch (error) {
      console.error("Erro ao salvar o passo:", error);
      throw error;
    }
  }
}

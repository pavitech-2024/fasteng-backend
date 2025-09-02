//Refatorado pra usar inteiramente o schema, ja que ele faz apena assinaturas brutas ao banco.
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { CreateMarshallDTO } from "../dto/create-marshal-dto";

export class MarshallRepository {
  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>
  ) {}

  async create(marshall: CreateMarshallDTO): Promise<Marshall> {
    const createdMarshall = new this.marshallModel(marshall);
    return createdMarshall.save();
  }

  async find(): Promise<Marshall[]> {
    return this.marshallModel.find().sort({ createdAt: -1 });
  }

  async findOne(name: string, userId: string): Promise<MarshallDocument | null> {
  return this.marshallModel.findOne({
    "generalData.name": name,
    "generalData.userId": userId
  });
}


  async findOneAndUpdate(
    marshallFilterQuery: FilterQuery<Marshall>,
    marshall: Partial<CreateMarshallDTO>
  ): Promise<Marshall | null> {
    return this.marshallModel.findOneAndUpdate(marshallFilterQuery, marshall, {
      new: true
    });
  }

 async findById(dosageId: string): Promise<MarshallDocument | null> {
  return this.marshallModel.findById(dosageId).exec();
}


  async createPartialMarshall(
    generalData: Partial<CreateMarshallDTO["generalData"]>,
    userId: string
  ):Promise<MarshallDocument> {
    try {
      const createdPartialMarshall = await this.marshallModel.create({
        generalData: { ...generalData, userId }
      });

      return createdPartialMarshall;
    } catch (error) {
      console.error("Erro ao salvar o step:", error);
      throw error;
    }
  }

  async saveStep(marshallId: string, step: number): Promise<void> {
    try {
      await this.marshallModel.updateOne(
        { _id: marshallId },
        { $set: { step } } // Corrigido para o step correto no schema
      );
    } catch (error) {
      console.error("Erro ao salvar o passo:", error);
      throw error;
    }
  }
}

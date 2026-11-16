import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallInitDto } from "../dto/marshall-init.dto";

export class MarshallRepository {
  constructor(@InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT) private marshallModel: Model<MarshallDocument>) { }

  async create(marshall: any): Promise<Marshall> {
    const createdMarshall = new this.marshallModel(marshall);
    return createdMarshall.save();
  }

  async find(): Promise<Marshall[]> {
    return this.marshallModel.find().sort({ createdAt: -1 });
  }

  async findOne(name: any, userId: string): Promise<MarshallDocument | null> {
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

  async findById(dosageId: string): Promise<Marshall> {
    return this.marshallModel.findById(dosageId);
  }

  async createPartialMarshall(marshall: MarshallInitDto, userId: string): Promise<MarshallDocument> {
    const createdPartialMarshall = await this.marshallModel.create({
    generalData: {
      ...marshall.generalData,
      userId,
    },
  });

  return createdPartialMarshall;
  }

  async saveStep(
  marshall: Pick<MarshallDocument, '_id'>,
  step: number,
): Promise<void> {
  await this.marshallModel.updateOne(
    { _id: marshall._id },
    { $set: { step } },
  );
}

   async findByIdAndUpdate(id: string, update: any, options?: any): Promise<Marshall> {
    return this.marshallModel.findByIdAndUpdate(id, update, { new: true, ...options }).exec();
  }
async findAllWithPagination(skip: number, limit: number): Promise<Marshall[]> {
  return this.marshallModel.find()
    .select('generalData.userId generalData.name generalData.step')
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
}

async countAll(): Promise<number> {
  return this.marshallModel.countDocuments().exec();
}

async findAll(): Promise<Marshall[]> {
  return this.marshallModel.find().lean().exec();
}
}
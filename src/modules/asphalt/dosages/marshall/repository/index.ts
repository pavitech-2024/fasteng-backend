
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import {
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallInitDto } from "../dto/marshall-init.dto";

export class MarshallRepository {
  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
  ) {}

  async create(marshall: Partial<Marshall>): Promise<MarshallDocument> {
    const createdMarshall = new this.marshallModel(marshall);
    return createdMarshall.save();
  }

  async find(): Promise<Marshall[]> {
    return this.marshallModel.find().sort({ createdAt: -1 });
  }

  async findOne(
    name: string,
    userId: string,
  ): Promise<MarshallDocument | null> {
    return this.marshallModel.findOne({
      "generalData.name": name,
      "generalData.userId": userId,
    });
  }

  async findOneAndUpdate(
    marshallFilterQuery: FilterQuery<Marshall>,
    marshall: UpdateQuery<Marshall>,
  ): Promise<MarshallDocument | null> {
    return this.marshallModel.findOneAndUpdate(
      marshallFilterQuery,
      marshall,
      { new: true },
    );
  }

  async findById(
    dosageId: string,
  ): Promise<MarshallDocument | null> {
    return this.marshallModel.findById(dosageId);
  }

  async createPartialMarshall(
    marshall: MarshallInitDto,
    userId: string,
  ): Promise<MarshallDocument> {
    return this.marshallModel.create({
      generalData: {
        ...marshall.generalData,
        userId,
      },
    });
  }

  async saveStep(
    marshall: Pick<MarshallDocument, "_id">,
    step: number,
  ): Promise<void> {
    await this.marshallModel.updateOne(
      { _id: marshall._id },
      { $set: { step } },
    );
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<Marshall>,
    options?: QueryOptions<Marshall>,
  ): Promise<MarshallDocument | null> {
    return this.marshallModel
      .findByIdAndUpdate(id, update, {
        new: true,
        ...options,
      })
      .exec();
  }

  async findAllWithPagination(
    skip: number,
    limit: number,
  ) {
    return this.marshallModel
      .find()
      .select("generalData.userId generalData.name step")
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

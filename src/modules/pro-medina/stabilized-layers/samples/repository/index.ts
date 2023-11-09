import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { StabilizedLayers_Sample, StabilizedLayers_SamplesDocument } from "../schemas";

export class StabilizedLayers_SamplesRepository {
  constructor(
    @InjectModel(StabilizedLayers_Sample.name, DATABASE_CONNECTION.PROMEDINA) private stabilizedLayers_sampleModel: Model<StabilizedLayers_SamplesDocument>,
  ) {}

  async create(stabilizedLayers_sample: any): Promise<StabilizedLayers_Sample> {
    const createdStabilizedLayers_Samples = new this.stabilizedLayers_sampleModel(stabilizedLayers_sample);
    return createdStabilizedLayers_Samples.save();
  }

  async find(): Promise<StabilizedLayers_Sample[]> {
    return this.stabilizedLayers_sampleModel.find();
  }

  async findOne(stabilizedLayers_samplesFilterQuery: any): 
  Promise<StabilizedLayers_Sample> {
    return this.stabilizedLayers_sampleModel.findOne(stabilizedLayers_samplesFilterQuery);
  }

  async findOneAndUpdate(stabilizedLayers_samplesFilterQuery: any, stabilizedLayers_sample: Partial<StabilizedLayers_Sample>): Promise<StabilizedLayers_Sample> {
    return this.stabilizedLayers_sampleModel.findOneAndUpdate(stabilizedLayers_samplesFilterQuery, stabilizedLayers_sample, {
      new: true,
    });
  }

  async findOneAndDelete(stabilizedLayers_samplesFilterQuery: any): Promise<StabilizedLayers_Sample> {
    return this.stabilizedLayers_sampleModel.findByIdAndDelete(stabilizedLayers_samplesFilterQuery);
  }
}
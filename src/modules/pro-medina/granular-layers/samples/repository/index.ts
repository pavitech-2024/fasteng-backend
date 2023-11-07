import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { GranularLayers_Sample, GranularLayers_SamplesDocument } from "../schemas";

export class GranularLayers_SamplesRepository {
  constructor(
    @InjectModel(GranularLayers_Sample.name, DATABASE_CONNECTION.PROMEDINA) private granularLayers_sampleModel: Model<GranularLayers_SamplesDocument>,
  ) {}

  async create(granularLayers_sample: any): Promise<GranularLayers_Sample> {
    const createdGranularLayers_Samples = new this.granularLayers_sampleModel(granularLayers_sample);
    return createdGranularLayers_Samples.save();
  }

  async find(): Promise<GranularLayers_Sample[]> {
    return this.granularLayers_sampleModel.find();
  }

  async findOne(granularLayers_samplesFilterQuery: any): 
  Promise<GranularLayers_Sample> {
    return this.granularLayers_sampleModel.findOne(granularLayers_samplesFilterQuery);
  }

  async findOneAndUpdate(granularLayers_samplesFilterQuery: any, granularLayers_sample: Partial<GranularLayers_Sample>): Promise<GranularLayers_Sample> {
    return this.granularLayers_sampleModel.findOneAndUpdate(granularLayers_samplesFilterQuery, granularLayers_sample, {
      new: true,
    });
  }

  async findOneAndDelete(granularLayers_samplesFilterQuery: any): Promise<GranularLayers_Sample> {
    return this.granularLayers_sampleModel.findByIdAndDelete(granularLayers_samplesFilterQuery);
  }
}
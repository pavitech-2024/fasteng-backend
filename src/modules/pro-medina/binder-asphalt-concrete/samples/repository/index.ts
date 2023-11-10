import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { BinderAsphaltConcrete_Sample, BinderAsphaltConcrete_SamplesDocument } from "../schemas";

export class BinderAsphaltConcrete_SamplesRepository {
  constructor(
    @InjectModel(BinderAsphaltConcrete_Sample.name, DATABASE_CONNECTION.PROMEDINA) private binderAsphaltConcrete_sampleModel: Model<BinderAsphaltConcrete_SamplesDocument>,
  ) {}

  async create(binderAsphaltConcrete_sample: any): Promise<BinderAsphaltConcrete_Sample> {
    const createdBinderAsphaltConcrete_Samples = new this.binderAsphaltConcrete_sampleModel(binderAsphaltConcrete_sample);
    return createdBinderAsphaltConcrete_Samples.save();
  }

  async find(): Promise<BinderAsphaltConcrete_Sample[]> {
    return this.binderAsphaltConcrete_sampleModel.find();
  }

  async findOne(binderAsphaltConcrete_samplesFilterQuery: any): 
  Promise<BinderAsphaltConcrete_Sample> {
    return this.binderAsphaltConcrete_sampleModel.findOne(binderAsphaltConcrete_samplesFilterQuery);
  }

  async findOneAndUpdate(binderAsphaltConcrete_samplesFilterQuery: any, binderAsphaltConcrete_sample: Partial<BinderAsphaltConcrete_Sample>): Promise<BinderAsphaltConcrete_Sample> {
    return this.binderAsphaltConcrete_sampleModel.findOneAndUpdate(binderAsphaltConcrete_samplesFilterQuery, binderAsphaltConcrete_sample, {
      new: true,
    });
  }

  async findOneAndDelete(binderAsphaltConcrete_samplesFilterQuery: any): Promise<BinderAsphaltConcrete_Sample> {
    return this.binderAsphaltConcrete_sampleModel.findByIdAndDelete(binderAsphaltConcrete_samplesFilterQuery);
  }
}
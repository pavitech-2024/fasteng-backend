import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { BinderAsphaltConcrete_Sample, BinderAsphaltConcrete_SamplesDocument } from "../schemas";
import { CommonQueryFilter } from "utils/queryFilter";

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

  async findAllByFilter(queryFilter: CommonQueryFilter): Promise<any> {    
    const { filter, limit, page, sort, need_count } = queryFilter;
    const fomattedPage = Number(page)
    const formattedLimit = Number(limit);
    const skip = (fomattedPage - 1) * formattedLimit;
    const parsedFilter = JSON.parse(filter);
    const searchFilter = { $and: [...parsedFilter] };
    const sortParam = sort ? sort[0] : "";
    const docs = await this.binderAsphaltConcrete_sampleModel
      .find(searchFilter)
      .skip(skip)
      .sort(sortParam)
      .limit(limit)
      .lean();
    
    const count = await this.binderAsphaltConcrete_sampleModel.countDocuments(searchFilter);
    let totalPages

    if (need_count) {
      totalPages = Math.ceil(count / limit);
    }

    return {
      docs,
      count,
      totalPages,
    }
  }

  async findOne(binderAsphaltConcrete_samplesFilterQuery: any): 
  Promise<BinderAsphaltConcrete_Sample> {
    const { name } = binderAsphaltConcrete_samplesFilterQuery;
    const sample = await this.binderAsphaltConcrete_sampleModel.findOne({'generalData.name': name});
    return sample;
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
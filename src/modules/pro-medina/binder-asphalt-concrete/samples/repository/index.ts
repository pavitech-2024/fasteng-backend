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
    const { filter, limit, page, need_count } = queryFilter;
    const fomattedPage = Number(page)
    const formattedLimit = Number(limit);
    const skip = (fomattedPage - 1) * formattedLimit;
    const parsedFilter = JSON.parse(filter);

    let formattedFilter = [];

    parsedFilter.forEach(obj => {
      if (obj.name) formattedFilter.push({ 'generalData.name': { $regex: `.*${obj.name}.*`, $options: 'i' } });
      if (obj.cityState) formattedFilter.push({ 'generalData.cityState': { $regex: `.*${obj.cityState}.*`, $options: 'i' } });
      if (obj.zone) formattedFilter.push({ 'generalData.zone': { $regex: `.*${obj.zone}.*`, $options: 'i' } });
      if (obj.layer) formattedFilter.push({ 'generalData.layer': { $regex: `.*${obj.layer}.*`, $options: 'i' } });
      if (obj.highway) formattedFilter.push({ 'generalData.highway': { $regex: `.*${obj.highway}.*`, $options: 'i' } });
    });

    let query = {};

    if (formattedFilter.length > 0) {
      query = { $and: formattedFilter };
    }

    const docs = await this.binderAsphaltConcrete_sampleModel
      .find(query)
      .collation({ locale: 'en', strength: 2 })
      .skip(skip)
      .limit(formattedLimit)
      .lean();
    
    const countQuery = formattedFilter.length > 0 ? { $and: formattedFilter } : {};
    const count = await this.binderAsphaltConcrete_sampleModel.countDocuments(countQuery);

    let totalPages;

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
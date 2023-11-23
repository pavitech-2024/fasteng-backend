import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { GranularLayers_Sample, GranularLayers_SamplesDocument } from "../schemas";
import { CommonQueryFilter } from "utils/queryFilter";

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

  async findAllByFilter(queryFilter: CommonQueryFilter): Promise<any> {    
    const { filter, limit, page, sort, need_count } = queryFilter;
    const fomattedPage = Number(page)
    const formattedLimit = Number(limit);
    const skip = (fomattedPage - 1) * formattedLimit;
    const parsedFilter = JSON.parse(filter);
    const sortParam = sort ? sort[0] : "";

    let formattedFilter = [];

    parsedFilter.forEach(obj => {
      if (obj.name) formattedFilter.push({ 'generalData.name': obj.name });
      if (obj.cityState) formattedFilter.push({ 'generalData.cityState': obj.cityState });
      if (obj.zone) formattedFilter.push({ 'generalData.zone': obj.zone });
      if (obj.layer) formattedFilter.push({ 'generalData.layer': obj.layer });
    });

    const docs = await this.granularLayers_sampleModel
      .find({
        $and: formattedFilter
      })
      .skip(skip)
      .limit(limit)
      .lean();

    
    const count = await this.granularLayers_sampleModel.countDocuments({
      $and: formattedFilter
    });

    let totalPages;

    if (need_count) {
      totalPages = Math.ceil(count / formattedLimit);
    }

    return {
      docs,
      count,
      totalPages,
    }
  }

  async findOne(granularLayers_samplesFilterQuery: any): 
  Promise<GranularLayers_Sample> {
    const { name } = granularLayers_samplesFilterQuery;
    const sample = await this.granularLayers_sampleModel.findOne({ 'generalData.name': name });

    return sample;
  }

  async findOneById(sampleId: string): 
  Promise<GranularLayers_Sample> {
    const sample = await this.granularLayers_sampleModel.findOne({ _id: sampleId });
    
    return sample;
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
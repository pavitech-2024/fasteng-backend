import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { GranularLayers_Sample, GranularLayers_SamplesDocument } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';

export class GranularLayers_SamplesRepository {
  constructor(
    @InjectModel(GranularLayers_Sample.name, DATABASE_CONNECTION.PROMEDINA)
    private granularLayers_sampleModel: Model<GranularLayers_SamplesDocument>,
  ) {}

  async create(granularLayers_sample: any): Promise<GranularLayers_Sample> {
    const createdGranularLayers_Samples = new this.granularLayers_sampleModel(granularLayers_sample);
    return createdGranularLayers_Samples.save();
  }

  async find(): Promise<GranularLayers_Sample[]> {
    return this.granularLayers_sampleModel.find();
  }

  async findAllByFilter(queryFilter: CommonQueryFilter): Promise<any> {
    const { filter, limit, page, need_count } = queryFilter;
    const fomattedPage = Number(page);
    const formattedLimit = Number(limit);
    const skip = (fomattedPage - 1) * formattedLimit;
    const parsedFilter = JSON.parse(filter);

    const formattedFilter = [];

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

    const docs = await this.granularLayers_sampleModel
      .find(query)
      .collation({ locale: 'en_US', caseFirst: 'off', strength: 2 })
      .skip(skip)
      .limit(formattedLimit)
      .lean();

    const countQuery = formattedFilter.length > 0 ? { $and: formattedFilter } : {};
    const count = await this.granularLayers_sampleModel.countDocuments(countQuery);

    let totalPages;

    if (need_count) {
      totalPages = Math.ceil(count / formattedLimit);
    }

    return {
      docs,
      count,
      totalPages,
    };
  }

  async findOne(granularLayers_samplesFilterQuery: any): Promise<GranularLayers_Sample> {
    const { name } = granularLayers_samplesFilterQuery;
    const sample = await this.granularLayers_sampleModel.findOne({ 'generalData.name': name });

    return sample;
  }

  async findOneById(sampleId: string): Promise<GranularLayers_Sample> {
    const sample = await this.granularLayers_sampleModel.findOne({ _id: sampleId });

    return sample;
  }

  async findOneAndUpdate(
    granularLayers_samplesFilterQuery: any,
    granularLayers_sample: Partial<GranularLayers_Sample>,
  ): Promise<GranularLayers_Sample> {
    return this.granularLayers_sampleModel.findOneAndUpdate(granularLayers_samplesFilterQuery, granularLayers_sample, {
      new: true,
    });
  }

  async findOneAndDelete(granularLayers_samplesFilterQuery: any): Promise<GranularLayers_Sample> {
    return this.granularLayers_sampleModel.findByIdAndDelete(granularLayers_samplesFilterQuery);
  }
}

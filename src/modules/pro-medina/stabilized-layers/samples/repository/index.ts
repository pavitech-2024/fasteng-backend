import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { StabilizedLayers_Sample, StabilizedLayers_SamplesDocument } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';

export class StabilizedLayers_SamplesRepository {
  constructor(
    @InjectModel(StabilizedLayers_Sample.name, DATABASE_CONNECTION.PROMEDINA)
    private stabilizedLayers_sampleModel: Model<StabilizedLayers_SamplesDocument>,
  ) {}

  async create(stabilizedLayers_sample: any): Promise<StabilizedLayers_Sample> {
    const createdStabilizedLayers_Samples = new this.stabilizedLayers_sampleModel(stabilizedLayers_sample);
    return createdStabilizedLayers_Samples.save();
  }

  async find(): Promise<any> {
    return this.stabilizedLayers_sampleModel.find();
  }

  async findAll(options: { page: number; limit: number }): Promise<any> {
    try {
      const { limit, page } = options;
      const fomattedPage = Number(page);
      const formattedLimit = Number(limit);
      const skip = (fomattedPage - 1) * formattedLimit;

      const docs = await this.stabilizedLayers_sampleModel.find().skip(skip).limit(formattedLimit).lean();

      const count = await this.stabilizedLayers_sampleModel.countDocuments();

      const totalPages = Math.ceil(count / formattedLimit);

      return {
        docs,
        count,
        totalPages,
      };
    } catch (error) {}

    return this.stabilizedLayers_sampleModel.find();
  }

  async findAllByFilter(queryFilter: CommonQueryFilter): Promise<any> {
    const { filter, limit, page, sort, need_count } = queryFilter;
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

    const docs = await this.stabilizedLayers_sampleModel
      .find(query)
      .collation({ locale: 'en', strength: 2 })
      .skip(skip)
      .limit(formattedLimit)
      .lean();
    
    const countQuery = formattedFilter.length > 0 ? { $and: formattedFilter } : {};
    const count = await this.stabilizedLayers_sampleModel.countDocuments(countQuery);

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

  async findOne(stabilizedLayers_samplesFilterQuery: any): Promise<StabilizedLayers_Sample> {
    const { name } = stabilizedLayers_samplesFilterQuery;
    const sample = await this.stabilizedLayers_sampleModel.findOne({ 'generalData.name': name });
    return sample;
  }

  async findOneById(sampleId: string): 
  Promise<StabilizedLayers_Sample> {
    const sample = await this.stabilizedLayers_sampleModel.findById(sampleId);
    
    return sample;
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

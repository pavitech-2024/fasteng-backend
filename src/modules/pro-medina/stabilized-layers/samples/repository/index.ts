import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { StabilizedLayers_Sample, StabilizedLayers_SamplesDocument } from '../schemas';
import { CommonQueryFilter } from 'utils/queryFilter';

export class StabilizedLayers_SamplesRepository {
  constructor(
    @InjectModel(StabilizedLayers_Sample.name, DATABASE_CONNECTION.PROMEDINA)
    private stabilizedLayers_sampleModel: Model<StabilizedLayers_SamplesDocument>,
  ) {}

  async create(stabilizedLayers_sample: any): Promise<StabilizedLayers_Sample> {
    const createdStabilizedLayers_Samples = new this.stabilizedLayers_sampleModel(stabilizedLayers_sample);
    return createdStabilizedLayers_Samples.save();
  }

  async find(): Promise<StabilizedLayers_Sample[]> {
    return this.stabilizedLayers_sampleModel.find();
  }

  async findAllByFilter(queryFilter: CommonQueryFilter): Promise<any> {
    const { filter, limit, page, sort, need_count } = queryFilter;
    const fomattedPage = Number(page);
    const formattedLimit = Number(limit);
    const skip = (fomattedPage - 1) * formattedLimit;
    const parsedFilter = JSON.parse(filter);
    const searchFilter = { $and: [...parsedFilter] };
    const sortParam = sort ? sort[0] : '';
    const docs = await this.stabilizedLayers_sampleModel
      .find(searchFilter)
      .skip(skip)
      .sort(sortParam)
      .limit(limit)
      .lean();

    const count = await this.stabilizedLayers_sampleModel.countDocuments(searchFilter);
    let totalPages;

    if (need_count) {
      totalPages = Math.ceil(count / limit);
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

  async findOneAndUpdate(
    stabilizedLayers_samplesFilterQuery: any,
    stabilizedLayers_sample: Partial<StabilizedLayers_Sample>,
  ): Promise<StabilizedLayers_Sample> {
    return this.stabilizedLayers_sampleModel.findOneAndUpdate(
      stabilizedLayers_samplesFilterQuery,
      stabilizedLayers_sample,
      {
        new: true,
      },
    );
  }

  async findOneAndDelete(stabilizedLayers_samplesFilterQuery: any): Promise<StabilizedLayers_Sample> {
    return this.stabilizedLayers_sampleModel.findByIdAndDelete(stabilizedLayers_samplesFilterQuery);
  }
}

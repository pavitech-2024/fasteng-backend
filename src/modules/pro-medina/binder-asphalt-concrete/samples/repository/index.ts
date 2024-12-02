import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { BinderAsphaltConcrete_Sample, BinderAsphaltConcrete_SamplesDocument } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';

export class BinderAsphaltConcrete_SamplesRepository {
  constructor(
    @InjectModel(BinderAsphaltConcrete_Sample.name, DATABASE_CONNECTION.PROMEDINA)
    private binderAsphaltConcrete_sampleModel: Model<BinderAsphaltConcrete_SamplesDocument>,
  ) {}

  async create(binderAsphaltConcrete_sample: any): Promise<BinderAsphaltConcrete_Sample> {
    const createdBinderAsphaltConcrete_Samples = new this.binderAsphaltConcrete_sampleModel(
      binderAsphaltConcrete_sample,
    );
    return createdBinderAsphaltConcrete_Samples.save();
  }

  async find(): Promise<BinderAsphaltConcrete_Sample[]> {
    return this.binderAsphaltConcrete_sampleModel.find();
  }

  async findAll(options: { page: number; limit: number }): Promise<any> {
    try {
      const { limit, page } = options;
      const fomattedPage = Number(page);
      const formattedLimit = Number(limit);
      const skip = (fomattedPage - 1) * formattedLimit;

      const docs = await this.binderAsphaltConcrete_sampleModel.find().skip(skip).limit(formattedLimit).lean();

      const count = await this.binderAsphaltConcrete_sampleModel.countDocuments();

      const totalPages = Math.ceil(count / formattedLimit);

      return {
        docs,
        count,
        totalPages,
      };
    } catch (error) {}

    return this.binderAsphaltConcrete_sampleModel.find();
  }

  async findAllByFilter(queryFilter: CommonQueryFilter): Promise<any> {
    const { filter, limit, page, need_count } = queryFilter;
    const parsedFilter = JSON.parse(filter);

    const formattedFilter: BinderAsphaltConcrete_Sample[] = parsedFilter.map(obj => {
      const filter = {};

      if (obj.name) filter['generalData.name'] = { $regex: `.*${obj.name}.*`, $options: 'i' };
      if (obj.cityState) filter['generalData.cityState'] = { $regex: `.*${obj.cityState}.*`, $options: 'i' };
      if (obj.zone) filter['generalData.zone'] = { $regex: `.*${obj.zone}.*`, $options: 'i' };
      if (obj.layer) filter['generalData.layer'] = { $regex: `.*${obj.layer}.*`, $options: 'i' };
      if (obj.highway) filter['generalData.highway'] = { $regex: `.*${obj.highway}.*`, $options: 'i' };

      return filter;
    });

    const query = formattedFilter.length > 0 ? { $and: formattedFilter } : {};

    const skip = (Number(page) - 1) * Number(limit);

    const docs = await this.binderAsphaltConcrete_sampleModel
      .find(query)
      .sort({ createdAt: 1 })
      .collation({ locale: 'en', strength: 2 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const countQuery = formattedFilter.length > 0 ? { $and: formattedFilter } : {};
    const count = await this.binderAsphaltConcrete_sampleModel.countDocuments(countQuery);

    let totalPages;

    if (need_count) {
      totalPages = Math.ceil(count / Number(limit));
    }

    return {
      docs,
      count,
      totalPages,
    };
  }

  async findOne(binderAsphaltConcrete_samplesFilterQuery: any): Promise<BinderAsphaltConcrete_Sample> {
    const { name } = binderAsphaltConcrete_samplesFilterQuery;
    const sample = await this.binderAsphaltConcrete_sampleModel.findOne({ 'generalData.name': name });
    return sample;
  }

  async findOneById(sampleId: string): 
  Promise<BinderAsphaltConcrete_Sample> {
    const sample = await this.binderAsphaltConcrete_sampleModel.findById(sampleId);
    
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

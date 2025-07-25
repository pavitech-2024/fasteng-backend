import { InjectModel } from '@nestjs/mongoose';
import { Sample, SampleDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';
import { FilterQuery, Model } from 'mongoose';

export class SamplesRepository {
  constructor(@InjectModel(Sample.name, DATABASE_CONNECTION.SOILS) private sampleModel: Model<SampleDocument>) {}

  async create(sample: any): Promise<Sample> {
    const createdSample = new this.sampleModel(sample);
    return createdSample.save();
  }

  async find(): Promise<Sample[]> {
    return this.sampleModel.find();
  }

  async findOne(samplesFilterQuery: FilterQuery<Sample>): Promise<Sample> {
    return this.sampleModel.findOne(samplesFilterQuery);
  }

  async findOneAndUpdate(samplesFilterQuery: FilterQuery<Sample>, sample: Partial<Sample>): Promise<Sample> {
    return this.sampleModel.findOneAndUpdate(samplesFilterQuery, sample, {
      new: true,
    });
  }

  async findOneAndDelete(samplesFilterQuery: FilterQuery<Sample>): Promise<Sample> {
    return this.sampleModel.findByIdAndDelete(samplesFilterQuery);
  }
}

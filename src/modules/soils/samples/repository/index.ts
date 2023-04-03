import { InjectModel } from '@nestjs/mongoose';
import { Sample, SampleDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';

export class SamplesRepository {
  constructor(@InjectModel(Sample.name, DATABASE_CONNECTION.SOILS) private sampleModel: Model<SampleDocument>) {}

  async create(sample: Sample): Promise<Sample> {
    const createdSample = new this.sampleModel(sample);
    return createdSample.save();
  }
}

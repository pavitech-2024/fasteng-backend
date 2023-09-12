import { InjectModel } from '@nestjs/mongoose';
import { ConcreteGranulometry, ConcreteGranulometryDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';


export class ConcreteGranulometryRepository {
  constructor(@InjectModel(ConcreteGranulometry.name, DATABASE_CONNECTION.CONCRETE) private granulometryModel: Model<ConcreteGranulometryDocument>) {}

  async findOne(granulometryFilterQuery: any): Promise<ConcreteGranulometry> {
    return this.granulometryModel.findOne(granulometryFilterQuery);
  }

  async findAll(): Promise<ConcreteGranulometry[]> {
    return this.granulometryModel.find();
  }

  async create(granulometry: any): Promise<ConcreteGranulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}
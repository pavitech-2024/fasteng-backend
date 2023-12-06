import { InjectModel } from '@nestjs/mongoose';
import { Granulometry, GranulometryDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model, FilterQuery } from 'mongoose';

export class ConcreteGranulometryRepository {
  constructor(@InjectModel(Granulometry.name, DATABASE_CONNECTION.CONCRETE) private granulometryModel: Model<GranulometryDocument>) {}

  async findOne(granulometryFilterQuery: FilterQuery<Granulometry>): Promise<Granulometry> {
    return this.granulometryModel.findOne(granulometryFilterQuery);
  }

  async findAll(): Promise<Granulometry[]> {
    return this.granulometryModel.find();
  }

  async findAllByMaterialId(granulometryFilterQuery: FilterQuery<Granulometry>): Promise<Granulometry[]> {
    return this.granulometryModel.find(granulometryFilterQuery);
  }

  async create(granulometry: any): Promise<Granulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model, FilterQuery } from 'mongoose';
import { Igg, IggDocument } from '../schemas';

export class IggRepository {
  constructor(@InjectModel(Igg.name, DATABASE_CONNECTION.ASPHALT) private iggModel: Model<IggDocument>) {}

  async findOne(iggFilterQuery: FilterQuery<Igg>): Promise<Igg> {
    return this.iggModel.findOne(iggFilterQuery);
  }

  async findAll(): Promise<Igg[]> {
    return this.iggModel.find();
  }

  async create(igg: any): Promise<Igg> {
    const createdIgg = new this.iggModel(igg);

    return createdIgg.save();
  }
}

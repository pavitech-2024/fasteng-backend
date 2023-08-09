import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Hrb, HrbDocument } from '../schemas';

export class HrbRepository {
  constructor(@InjectModel(Hrb.name, DATABASE_CONNECTION.SOILS) private hrbModel: Model<HrbDocument>) {}

  async findOne(hrbFilterQuery: any): Promise<Hrb> {
    return this.hrbModel.findOne(hrbFilterQuery);
  }

  async findAll(): Promise<Hrb[]> {
    return this.hrbModel.find();
  }

  async create(hrb: any): Promise<Hrb> {
    const createdHrb = new this.hrbModel(hrb);

    return createdHrb.save();
  }
}

import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Rtcd, RtcdDocument } from '../schemas';

export class RtcdRepository {
  constructor(@InjectModel(Rtcd.name, DATABASE_CONNECTION.ASPHALT) private rtcdModel: Model<RtcdDocument>) {}

  async findOne(rtcdFilterQuery: any): Promise<Rtcd> {
    return this.rtcdModel.findOne(rtcdFilterQuery);
  }

  async findAll(): Promise<Rtcd[]> {
    return this.rtcdModel.find();
  }

  async create(rtcd: any): Promise<Rtcd> {
    const createdRtcd = new this.rtcdModel(rtcd);

    return createdRtcd.save();
  }
}

import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Rt, RtDocument } from '../schemas';

export class RtRepository {
  constructor(@InjectModel(Rt.name, DATABASE_CONNECTION.ASPHALT) private rtModel: Model<RtDocument>) {}

  async findOne(rtFilterQuery: any): Promise<Rt> {
    return this.rtModel.findOne(rtFilterQuery);
  }

  async findAll(): Promise<Rt[]> {
    return this.rtModel.find();
  }

  async create(rt: any): Promise<Rt> {
    const createdRt = new this.rtModel(rt);

    return createdRt.save();
  }
}

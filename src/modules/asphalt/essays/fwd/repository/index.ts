import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model, FilterQuery } from 'mongoose';
import { Fwd, FwdDocument } from '../schema';

export class FwdRepository {
  constructor(@InjectModel(Fwd.name, DATABASE_CONNECTION.ASPHALT) private fwdModel: Model<FwdDocument>) {}

  async findOne(fwdFilterQuery: FilterQuery<Fwd>): Promise<Fwd> {
    return this.fwdModel.findOne(fwdFilterQuery);
  }

  async findAll(): Promise<Fwd[]> {
    return this.fwdModel.find();
  }

  async findAllByUserId(id: string): Promise<Fwd[]> {
    return this.fwdModel.find({"generalData.userId": id});
  }

  async create(fwd: any): Promise<Fwd> {
    const createdFwd = new this.fwdModel(fwd);

    return createdFwd.save();
  }
}

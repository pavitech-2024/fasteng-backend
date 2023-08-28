import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Chapman, ChapmanDocument } from '../schemas';

export class ChapmanRepository {
  constructor(@InjectModel(Chapman.name, DATABASE_CONNECTION.CONCRETE) private chapmanModel: Model<ChapmanDocument>) {}

  async findOne(chapmanFilterQuery: any): Promise<Chapman> {
    return this.chapmanModel.findOne(chapmanFilterQuery);
  }

  async findAll(): Promise<Chapman[]> {
    return this.chapmanModel.find();
  }

  async create(chapman: any): Promise<Chapman> {
    const createdChapman = new this.chapmanModel(chapman);

    return createdChapman.save();
  }
}

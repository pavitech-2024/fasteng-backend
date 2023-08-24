import { InjectModel } from '@nestjs/mongoose';
import { Sucs, SucsDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class SucsRepository {
  private logger = new Logger(SucsRepository.name);

  constructor(@InjectModel(Sucs.name, DATABASE_CONNECTION.SOILS) private sucsModel: Model<SucsDocument>) {}

  async findOne(sucsFilterQuery: any): Promise<Sucs> {
    return this.sucsModel.findOne(sucsFilterQuery);
  }

  async findAll(): Promise<Sucs[]> {
    return this.sucsModel.find();
  }

  async create(sucs: any): Promise<Sucs> {
    const createdSucs = new this.sucsModel(sucs);

    return createdSucs.save();
  }
}

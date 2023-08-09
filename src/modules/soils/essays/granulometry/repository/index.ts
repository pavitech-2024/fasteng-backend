import { InjectModel } from '@nestjs/mongoose';
import { Granulometry, GranulometryDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class GranulometryRepository {
  private logger = new Logger(GranulometryRepository.name);

  constructor(@InjectModel(Granulometry.name, DATABASE_CONNECTION.SOILS) private granulometryModel: Model<GranulometryDocument>) {}

  async findOne(granulometryFilterQuery: any): Promise<Granulometry> {
    this.logger.log(granulometryFilterQuery);
    return this.granulometryModel.findOne(granulometryFilterQuery);
  }

  async findAll(): Promise<Granulometry[]> {
    return this.granulometryModel.find();
  }

  async create(granulometry: any): Promise<Granulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}
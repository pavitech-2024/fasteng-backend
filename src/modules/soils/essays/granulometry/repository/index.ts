import { InjectModel } from '@nestjs/mongoose';
import { SoilsGranulometry, SoilsGranulometryDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class SoilsGranulometryRepository {
  private logger = new Logger(SoilsGranulometryRepository.name);

  constructor(@InjectModel(SoilsGranulometry.name, DATABASE_CONNECTION.SOILS) private granulometryModel: Model<SoilsGranulometryDocument>) {}

  async findOne(granulometryFilterQuery: any): Promise<SoilsGranulometry> {
    return this.granulometryModel.findOne(granulometryFilterQuery);
  }

  async findAllBySample(granulometryFilterQuery: any): Promise<SoilsGranulometry[]> {
    return this.granulometryModel.find(granulometryFilterQuery)
  }

  async findAll(): Promise<SoilsGranulometry[]> {
    return this.granulometryModel.find();
  }

  async create(granulometry: any): Promise<SoilsGranulometry> {
    const createdGranulometry = new this.granulometryModel(granulometry);

    return createdGranulometry.save();
  }
}
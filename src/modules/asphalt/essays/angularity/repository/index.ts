import { InjectModel } from '@nestjs/mongoose';
import { Angularity, AngularityDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class AngularityRepository {
  private logger = new Logger(AngularityRepository.name);

  constructor(@InjectModel(Angularity.name, DATABASE_CONNECTION.ASPHALT) private angularityModel: Model<AngularityDocument>) {}

  async findOne(angularityFilterQuery: any): Promise<Angularity> {
    return this.angularityModel.findOne(angularityFilterQuery);
  }

  async findAll(): Promise<Angularity[]> {
    return this.angularityModel.find();
  }

  async create(angularity: any): Promise<Angularity> {
    const createdAngularity = new this.angularityModel(angularity);

    return createdAngularity.save();
  }
}

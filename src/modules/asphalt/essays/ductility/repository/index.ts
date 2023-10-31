import { InjectModel } from '@nestjs/mongoose';
import { Ductility, DuctilityDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class DuctilityRepository {
  private logger = new Logger(DuctilityRepository.name);

  constructor(@InjectModel(Ductility.name, DATABASE_CONNECTION.ASPHALT) private ductilityModel: Model<DuctilityDocument>) {}

  async findOne(ductilityFilterQuery: any): Promise<Ductility> {
    return this.ductilityModel.findOne(ductilityFilterQuery);
  }

  async findAll(): Promise<Ductility[]> {
    return this.ductilityModel.find();
  }

  async create(ductility: any): Promise<Ductility> {
    const createdDuctility = new this.ductilityModel(ductility);

    return createdDuctility.save();
  }
}

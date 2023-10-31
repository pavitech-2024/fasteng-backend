import { InjectModel } from '@nestjs/mongoose';
import { SpecifyMass, SpecifyMassDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class SpecifyMassRepository {
  private logger = new Logger(SpecifyMassRepository.name);

  constructor(@InjectModel(SpecifyMass.name, DATABASE_CONNECTION.ASPHALT) private specifymassModel: Model<SpecifyMassDocument>) {}

  async findOne(specifymassFilterQuery: any): Promise<SpecifyMass> {
    return this.specifymassModel.findOne(specifymassFilterQuery);
  }

  async findAll(): Promise<SpecifyMass[]> {
    return this.specifymassModel.find();
  }

  async create(specifymass: any): Promise<SpecifyMass> {
    const createdSpecifyMass = new this.specifymassModel(specifymass);

    return createdSpecifyMass.save();
  }
}

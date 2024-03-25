import { InjectModel } from '@nestjs/mongoose';
import { SpecifyMass, SpecifyMassDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class SpecifyMassRepository {
  private logger = new Logger(SpecifyMassRepository.name);

  constructor(@InjectModel(SpecifyMass.name, DATABASE_CONNECTION.ASPHALT) private specifyMassModel: Model<SpecifyMassDocument>) {}

  async findOne(specifyMassFilterQuery: any): Promise<SpecifyMass> {
    const SpecifyMass = await this.specifyMassModel.findOne(specifyMassFilterQuery);
    console.log("🚀 ~ SpecifyMassRepository ~ findOne ~ SpecifyMass:", SpecifyMass)

    return SpecifyMass;
  }

  async findAll(): Promise<SpecifyMass[]> {
    return this.specifyMassModel.find();
  }

  async create(specifyMass: any): Promise<SpecifyMass> {
    const createdSpecifyMass = new this.specifyMassModel(specifyMass);

    return createdSpecifyMass.save();
  }
}

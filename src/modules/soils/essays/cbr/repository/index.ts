import { InjectModel } from '@nestjs/mongoose';
import { Cbr, CbrDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';

export class CbrRepository {
  constructor(@InjectModel(Cbr.name, DATABASE_CONNECTION.SOILS) private cbrModel: Model<CbrDocument>) {}

  async findOne(cbrFilterQuery: any): Promise<Cbr> {
    return this.cbrModel.findOne(cbrFilterQuery);
  }
}

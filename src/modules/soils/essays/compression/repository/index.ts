import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Compression, CompressionDocument } from '../schema';

export class CompressionRepository {
  constructor(
    @InjectModel(Compression.name, DATABASE_CONNECTION.SOILS)
    private compressionModel: Model<CompressionDocument>,
  ) {}

  async findOne(compressionFilterQuery: any): Promise<Compression> {
    return this.compressionModel.findOne(compressionFilterQuery);
  }

  async create(compression: any): Promise<Compression> {
    const createdCompression = new this.compressionModel(compression);

    return createdCompression.save();
  }
}

import { InjectModel } from '@nestjs/mongoose';
import { ShapeIndex, ShapeIndexDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class ShapeIndexRepository {
  private logger = new Logger(ShapeIndexRepository.name);

  constructor(@InjectModel(ShapeIndex.name, DATABASE_CONNECTION.ASPHALT) private shapeindexModel: Model<ShapeIndexDocument>) {}

  async findOne(shapeindexFilterQuery: any): Promise<ShapeIndex> {
    return this.shapeindexModel.findOne(shapeindexFilterQuery);
  }

  async findAll(): Promise<ShapeIndex[]> {
    return this.shapeindexModel.find();
  }

  async create(shapeindex: any): Promise<ShapeIndex> {
    const createdShapeIndex = new this.shapeindexModel(shapeindex);

    return createdShapeIndex.save();
  }
}

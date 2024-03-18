import { InjectModel } from '@nestjs/mongoose';
import { ShapeIndex, ShapeIndexDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class ShapeIndexRepository {
  private logger = new Logger(ShapeIndexRepository.name);

  constructor(@InjectModel(ShapeIndex.name, DATABASE_CONNECTION.ASPHALT) private shapeIndexModel: Model<ShapeIndexDocument>) {}

  async findOne(shapeIndexFilterQuery: any): Promise<ShapeIndex> {
    return this.shapeIndexModel.findOne(shapeIndexFilterQuery);
  }

  async findAll(): Promise<ShapeIndex[]> {
    return this.shapeIndexModel.find();
  }

  async create(shapeIndex: any): Promise<ShapeIndex> {
    const createdShapeIndex = new this.shapeIndexModel(shapeIndex);

    return createdShapeIndex.save();
  }
}

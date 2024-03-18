import { InjectModel } from '@nestjs/mongoose';
import { FlashPoint, FlashPointDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class FlashPointRepository {
  private logger = new Logger(FlashPointRepository.name);

  constructor(@InjectModel(FlashPoint.name, DATABASE_CONNECTION.ASPHALT) private flashPointModel: Model<FlashPointDocument>) {}

  async findOne(flashPointFilterQuery: any): Promise<FlashPoint> {
    return this.flashPointModel.findOne(flashPointFilterQuery);
  }

  async findAll(): Promise<FlashPoint[]> {
    return this.flashPointModel.find();
  }

  async create(flashPoint: any): Promise<FlashPoint> {
    const createdFlashPoint = new this.flashPointModel(flashPoint);

    return createdFlashPoint.save();
  }
}

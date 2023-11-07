import { InjectModel } from '@nestjs/mongoose';
import { FlashPoint, FlashPointDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class FlashPointRepository {
  private logger = new Logger(FlashPointRepository.name);

  constructor(@InjectModel(FlashPoint.name, DATABASE_CONNECTION.ASPHALT) private flashpointModel: Model<FlashPointDocument>) {}

  async findOne(flashpointFilterQuery: any): Promise<FlashPoint> {
    return this.flashpointModel.findOne(flashpointFilterQuery);
  }

  async findAll(): Promise<FlashPoint[]> {
    return this.flashpointModel.find();
  }

  async create(flashpoint: any): Promise<FlashPoint> {
    const createdFlashPoint = new this.flashpointModel(flashpoint);

    return createdFlashPoint.save();
  }
}

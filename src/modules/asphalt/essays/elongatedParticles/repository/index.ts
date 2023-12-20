import { InjectModel } from '@nestjs/mongoose';
import { ElongatedParticles, ElongatedParticlesDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class ElongatedParticlesRepository {
  private logger = new Logger(ElongatedParticlesRepository.name);

  constructor(@InjectModel(ElongatedParticles.name, DATABASE_CONNECTION.ASPHALT) private elongatedParticlesModel: Model<ElongatedParticlesDocument>) {}

  async findOne(elongatedParticlesFilterQuery: any): Promise<ElongatedParticles> {
    return this.elongatedParticlesModel.findOne(elongatedParticlesFilterQuery);
  }

  async findAll(): Promise<ElongatedParticles[]> {
    return this.elongatedParticlesModel.find();
  }

  async create(elongatedParticles: any): Promise<ElongatedParticles> {
    const createdElongatedParticles = new this.elongatedParticlesModel(elongatedParticles);

    return createdElongatedParticles.save();
  }
}

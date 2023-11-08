import { InjectModel } from '@nestjs/mongoose';
import { ElongatedParticles, ElongatedParticlesDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class ElongatedParticlesRepository {
  private logger = new Logger(ElongatedParticlesRepository.name);

  constructor(@InjectModel(ElongatedParticles.name, DATABASE_CONNECTION.ASPHALT) private elongatedparticlesModel: Model<ElongatedParticlesDocument>) {}

  async findOne(elongatedparticlesFilterQuery: any): Promise<ElongatedParticles> {
    return this.elongatedparticlesModel.findOne(elongatedparticlesFilterQuery);
  }

  async findAll(): Promise<ElongatedParticles[]> {
    return this.elongatedparticlesModel.find();
  }

  async create(elongatedparticles: any): Promise<ElongatedParticles> {
    const createdElongatedParticles = new this.elongatedparticlesModel(elongatedparticles);

    return createdElongatedParticles.save();
  }
}

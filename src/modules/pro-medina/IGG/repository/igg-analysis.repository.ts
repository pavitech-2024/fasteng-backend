import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IggAnalysis, IggAnalysisDocument } from '../schema/igg-analysis.schema';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';
import { from } from 'rxjs';

@Injectable()
export class IggAnalysisRepository {
  constructor(
    @InjectModel(IggAnalysis.name, DATABASE_CONNECTION.PROMEDINA)
    private iggAnalysisModel: Model<IggAnalysisDocument>,
  ) {}

  async create(createIggAnalysisDto: any): Promise<IggAnalysis> {
    try {
      const createdAnalysis = new this.iggAnalysisModel(createIggAnalysisDto);
      return await createdAnalysis.save();
    } catch (error) {
      console.error('Erro no repository ao criar análise IGG:', error);
      throw error;
    }
  }

  async findAll(): Promise<IggAnalysis[]> {
    return this.iggAnalysisModel.find().exec();
  }

  async findById(id: string): Promise<IggAnalysis> {
    return this.iggAnalysisModel.findById(id).exec();
  }

  async update(id: string, updateData: any): Promise<IggAnalysis> {
    return this.iggAnalysisModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<IggAnalysis> {
    return this.iggAnalysisModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<IggAnalysis[]> {
    return this.iggAnalysisModel.find({ userId }).exec();
  }
}
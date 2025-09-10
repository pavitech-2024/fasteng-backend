// src/modules/pro-medina/fwd/repository/fwd-analysis.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FwdAnalysis, FwdAnalysisDocument } from '../schemas/fwd-analysis.schema';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';

@Injectable()
export class FwdAnalysisRepository {
  constructor(
    @InjectModel(FwdAnalysis.name, DATABASE_CONNECTION.PROMEDINA)
    private fwdAnalysisModel: Model<FwdAnalysisDocument>,
  ) {}

  async create(createFwdAnalysisDto: any): Promise<FwdAnalysis> {
    try {
      const createdAnalysis = new this.fwdAnalysisModel(createFwdAnalysisDto);
      return await createdAnalysis.save();
    } catch (error) {
      console.error('Erro no repository ao criar análise:', error);
      throw error;
    }
  }

  async findAll(): Promise<FwdAnalysis[]> {
    return this.fwdAnalysisModel.find().exec();
  }

  async findById(id: string): Promise<FwdAnalysis> {
    return this.fwdAnalysisModel.findById(id).exec();
  }

  async update(id: string, updateData: any): Promise<FwdAnalysis> {
    return this.fwdAnalysisModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<FwdAnalysis> {
    return this.fwdAnalysisModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<FwdAnalysis[]> {
    return this.fwdAnalysisModel.find({ userId }).exec();
  }
}
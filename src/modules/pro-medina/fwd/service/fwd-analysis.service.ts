// src/modules/pro-medina/fwd/service/fwd-analysis.service.ts
import { Injectable } from '@nestjs/common';
import { FwdAnalysisRepository } from '../repository/fwd-analysis.repository';
import { CreateFwdAnalysisDto } from '../dto/create-fwd-analysis.dto';

@Injectable()
export class FwdAnalysisService {
  constructor(private readonly fwdAnalysisRepository: FwdAnalysisRepository) {} // ← Deve injetar o Repository, não o Model

  async create(createFwdAnalysisDto: CreateFwdAnalysisDto): Promise<any> {
    try {
      console.log('Dados recebidos para criação:', JSON.stringify(createFwdAnalysisDto, null, 2));
      
      // Use o repository para criar
      return await this.fwdAnalysisRepository.create(createFwdAnalysisDto);
    } catch (error) {
      console.error('Erro detalhado ao criar análise:', error);
      throw new Error(`Falha ao criar análise: ${error.message}`);
    }
  }

  async findAll(): Promise<any[]> {
    return this.fwdAnalysisRepository.findAll();
  }

  async findOne(id: string): Promise<any> {
    return this.fwdAnalysisRepository.findById(id);
  }

  async update(id: string, updateFwdAnalysisDto: any): Promise<any> {
    return this.fwdAnalysisRepository.update(id, updateFwdAnalysisDto);
  }

  async remove(id: string): Promise<any> {
    return this.fwdAnalysisRepository.delete(id);
  }

  async processAnalysis(id: string): Promise<any> {
    const analysis = await this.findOne(id);
    // Implemente a lógica de processamento aqui
    return { message: 'Análise processada', analysis };
  }
}
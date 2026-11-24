import { Injectable } from '@nestjs/common';
import { FwdRepository } from '../repository/fwd.repository';
import { CreateFwdAnalysisDto } from '../dto/create.fwd.dto';

@Injectable()
export class FwdService {
  constructor(private readonly fwdAnalysisRepository: FwdRepository) {}

  async create(createFwdAnalysisDto: CreateFwdAnalysisDto): Promise<any> {
    try {
      console.log('Dados recebidos para criação:', JSON.stringify(createFwdAnalysisDto, null, 2));
      return await this.fwdAnalysisRepository.create(createFwdAnalysisDto);
    } catch (error) {
      console.error('Erro detalhado ao criar análise:', error);
      if (error instanceof Error) {
        throw new Error(`Falha ao criar análise: ${error.message}`);
      }
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
    return { message: 'Análise processada', analysis };
  }
}
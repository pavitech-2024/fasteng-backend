import { Injectable, NotFoundException } from '@nestjs/common';
import { IggAnalysisRepository } from '../repository/igg-analysis.repository';
import { CreateIggAnalysisDto } from '../dto/create-igg-analysis.dto';

@Injectable()
export class IggAnalysisService {
  constructor(
    private readonly iggAnalysisRepository: IggAnalysisRepository,
  ) {}

  async create(createIggAnalysisDto: CreateIggAnalysisDto): Promise<any> {
    try {
      console.log('Dados recebidos para criação IGG:', JSON.stringify(createIggAnalysisDto, null, 2));
      return await this.iggAnalysisRepository.create(createIggAnalysisDto);
    } catch (error) {
      console.error('Erro detalhado ao criar análise IGG:', error);
      if (error instanceof Error) {
        throw new Error(`Falha ao criar análise IGG: ${error.message}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    return this.iggAnalysisRepository.findAll();
  }

  async findOne(id: string): Promise<any> {
    const analysis = await this.iggAnalysisRepository.findById(id);
    if (!analysis) {
      throw new NotFoundException(`Análise IGG com ID ${id} não encontrada`);
    }
    return analysis;
  }

  async update(id: string, updateIggAnalysisDto: any): Promise<any> {
    const analysis = await this.findOne(id);
    return this.iggAnalysisRepository.update(id, updateIggAnalysisDto);
  }

  async remove(id: string): Promise<any> {
    const analysis = await this.findOne(id);
    return this.iggAnalysisRepository.delete(id);
  }

  async processAnalysis(id: string): Promise<any> {
    const analysis = await this.findOne(id);
    // Aqui você implementa a lógica de processamento do IGG
    // usando a função processarDadosDNIT do frontend
    return { 
      message: 'Análise IGG processada com sucesso', 
      analysis 
    };
  }
}
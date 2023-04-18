import { Injectable, Logger } from '@nestjs/common';
import { SamplesRepository } from '../repository';
import { Sample } from '../schemas';
import { AlreadyExists, NotFound } from '../../../../utils/exceptions';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { Request } from 'express';

@Injectable()
export class SamplesService {
  private logger = new Logger(SamplesService.name);

  constructor(private readonly samplesRepository: SamplesRepository) {}

  async createSample(sample: CreateSampleDto, req: Request): Promise<Sample> {
    try {
      // verifica se já existe uma amostra com o mesmo nome no banco de dados
      if (await this.samplesRepository.findOne({ name: sample.name }))
        throw new AlreadyExists(`Sample with name "${sample.name}"`);

      // cria uma amostra no banco de dados
      return this.samplesRepository.create({
        ...sample,
        createdAt: new Date(),
        user: req.user._id,
      });
    } catch (error) {
      this.logger.error(`error on create sample > [error]: ${error}`);

      throw error;
    }
  }

  async getSample(sampleId: string): Promise<Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sample = await this.samplesRepository.findOne({ _id: sampleId });

      // se não encontrar a amostra, retorna um erro
      if (!sample) throw new NotFound('Sample');

      // retorna a amostra encontrada
      return sample;
    } catch (error) {
      this.logger.error(`error on get sample > [error]: ${error}`);

      throw error;
    }
  }

  async getAllSamples(): Promise<Sample[]> {
    try {
      // busca todas as amostras no banco de dados
      const samples = await this.samplesRepository.find();

      // retorna as amostras encontradas
      return samples;
    } catch (error) {
      this.logger.error(`error on get all samples > [error]: ${error}`);

      throw error;
    }
  }

  async updateSample(sample: Sample): Promise<Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sampleFound = await this.samplesRepository.findOne({ _id: sample._id });

      // se não encontrar a amostra, retorna um erro
      if (!sampleFound) throw new NotFound('Sample');

      // atualiza a amostra no banco de dados
      return this.samplesRepository.findOneAndUpdate({ _id: sample._id }, sample);
    } catch (error) {
      this.logger.error(`error on update sample > [error]: ${error}`);

      throw error;
    }
  }

  async deleteSample(sampleId: string): Promise<Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sample = await this.samplesRepository.findOne({ _id: sampleId });

      // se não encontrar a amostra, retorna um erro
      if (!sample) throw new NotFound('Sample');

      // deleta a amostra no banco de dados
      return this.samplesRepository.findOneAndDelete({ _id: sampleId });
    } catch (error) {
      this.logger.error(`error on delete sample > [error]: ${error}`);

      throw error;
    }
  }
}

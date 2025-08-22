import { Injectable, Logger } from '@nestjs/common';
import { SamplesRepository } from '../repository';
import { Sample } from '../schemas';
import { AlreadyExists, NotFound } from '../../../../utils/exceptions';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { GetEssaysBySample_Service } from './get-essays-by-sample.service';

@Injectable()
export class SamplesService {
  private logger = new Logger(SamplesService.name);

  constructor(
    private readonly samplesRepository: SamplesRepository,
    private readonly getEssaysBySample_Service: GetEssaysBySample_Service
  ) {}

  async createSample(sample: CreateSampleDto): Promise<Sample> {
    try {
      const { name, userId } = sample;
      const sampleFound = await this.samplesRepository.findOne({ name, userId });
      // verifica se existe uma sample com mesmo nome e userId no banco de dados
      if (sampleFound) throw new AlreadyExists(`Sample with name "${sample.name}"`);

      const createdSample = await this.samplesRepository.create(sample);

      return createdSample;
    } catch (error) {
      this.logger.error(`error on create sample > [error]: ${error}`);

      throw error;
    }
  }

  async getSample(sampleId: string): Promise<any> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sample = await this.samplesRepository.findOne({ _id: sampleId });

      // se não encontrar a amostra, retorna um erro
      if (!sample) throw new NotFound('Sample');

      // Buscar os ensaios com esse material;
      const essays = await this.getEssaysBySample_Service.getEssaysBySample(sample)

      return { sample, essays}
    } catch (error) {
      this.logger.error(`error on get sample > [error]: ${error}`);

      throw error;
    }
  }

  async getAllSamplesByUserId(userId: string): Promise<Sample[]> {
    try {
      // busca todas as amostras no banco de dados
      const samples = await this.samplesRepository.find();

      // retorna as amostras encontradas que pertencem ao usuário
      return samples.filter((sample) => sample.userId === userId);
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

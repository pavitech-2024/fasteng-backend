import { Injectable, Logger } from '@nestjs/common';
import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { GranularLayers_SamplesRepository } from '../repository';
import { GranularLayers_Sample } from '../schemas';
import { AlreadyExists, NotFound } from 'utils/exceptions';

@Injectable()
export class GranularLayersSamplesService {
  private logger = new Logger(GranularLayersSamplesService.name);

  constructor(private readonly granularLayers_SamplesRepository: GranularLayers_SamplesRepository) {}

  async createSample(sample: any): Promise<GranularLayers_Sample> {
    try {
      // verifica se existe uma sample com mesmo nome e userId no banco de dados
      if (await this.granularLayers_SamplesRepository.findOne({ name: sample.generalData.name }))
        throw new AlreadyExists(`Granular layer sample with name "${sample.generalData.name}"`);
      
      // cria uma amostra no banco de dados
      return this.granularLayers_SamplesRepository.create({
        ...sample,
        createdAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`error on create sample > [error]: ${error}`);
      throw error;
    }
  }

  // async getAllSamples(userId: string): Promise<GranularLayers_Sample[]> {
  //   try {
  //     // busca todas as amostras no banco de dados
  //     const samples = await this.granularLayers_SamplesRepository.find();

  //     // retorna as amostras encontradas que pertencem ao usuário
  //     return samples.filter((sample) => sample.generalData.userId === userId);
  //   } catch (error) {
  //     this.logger.error(`error on get all granular layers samples > [error]: ${error}`);

  //     throw error;
  //   }
  // }

  async getSample(sampleId: string): Promise<GranularLayers_Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sample = await this.granularLayers_SamplesRepository.findOne({ _id: sampleId });

      // se não encontrar a amostra, retorna um erro
      if (!sample) throw new NotFound('Sample');

      // retorna a amostra encontrada
      return sample;
    } catch (error) {
      this.logger.error(`error on get sample > [error]: ${error}`);

      throw error;
    }
  }

  async updateSample(sample: GranularLayers_Sample): Promise<GranularLayers_Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sampleFound = await this.granularLayers_SamplesRepository.findOne({ _id: sample._id });

      // se não encontrar a amostra, retorna um erro
      if (!sampleFound) throw new NotFound('Sample');

      // atualiza a amostra no banco de dados
      return this.granularLayers_SamplesRepository.findOneAndUpdate({ _id: sample._id }, sample);
    } catch (error) {
      this.logger.error(`error on update sample > [error]: ${error}`);

      throw error;
    }
  }

  async deleteSample(sampleId: string): Promise<GranularLayers_Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sample = await this.granularLayers_SamplesRepository.findOne({ _id: sampleId });

      // se não encontrar a amostra, retorna um erro
      if (!sample) throw new NotFound('Sample');

      // deleta a amostra no banco de dados
      return this.granularLayers_SamplesRepository.findOneAndDelete({ _id: sampleId });
    } catch (error) {
      this.logger.error(`error on delete sample > [error]: ${error}`);

      throw error;
    }
  }
}

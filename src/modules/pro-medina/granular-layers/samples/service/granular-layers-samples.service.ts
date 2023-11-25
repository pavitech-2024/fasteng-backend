import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { GranularLayers_SamplesRepository } from '../repository';
import { GranularLayers_Sample } from '../schemas';
import { AlreadyExists, NotFound } from 'utils/exceptions';
import { CommonQueryFilter } from 'utils/queryFilter';

@Injectable()
export class GranularLayersSamplesService {
  private logger = new Logger(GranularLayersSamplesService.name);

  constructor(private readonly granularLayers_SamplesRepository: GranularLayers_SamplesRepository) {}

  async createSample(sample: CreateGranularLayersSampleDto): Promise<GranularLayers_Sample> {
    try {
      const sampleFound = await this.granularLayers_SamplesRepository.findOne({ name: sample.generalData.name });
      
      if (sampleFound) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: `Granular layer sample with name "${sample.generalData.name}" already exists.`,
          },
          HttpStatus.CONFLICT,
        );
      }
      
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

  async getAllSamples(): Promise<GranularLayers_Sample[]> {
    try {
      // busca todas as amostras no banco de dados
      const samples = await this.granularLayers_SamplesRepository.find();

      // retorna as amostras encontradas que pertencem ao usuário
      return samples;
    } catch (error) {
      this.logger.error(`error on get all granular layers samples > [error]: ${error}`);

      throw error;
    }
  }

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

  async getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any> {
    try {
      // busca todas as amostras que correspondam ao filtro de busca selecionado
      const samples = await this.granularLayers_SamplesRepository.findAllByFilter(queryFilter);

      // se não encontrar a amostra, retorna um erro
      // if (samples.docs.length <= 0) throw new NotFound('Sample');

      // retorna a amostra encontrada
      return {
        docs: samples.docs,
        totalPages: samples.totalPages,
        count: samples.count
      };
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
      const sample = await this.granularLayers_SamplesRepository.findOneById(sampleId);

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

import { Injectable, Logger } from "@nestjs/common";
import { AlreadyExists, NotFound } from "utils/exceptions";
import { BinderAsphaltConcrete_SamplesRepository } from "../repository";
import { BinderAsphaltConcrete_Sample } from "../schemas";
import { CreateBinderAsphaltConcreteSampleDto } from "../dto/create-binder-asphalt-concrete-samples.dto";
import { CommonQueryFilter } from "utils/queryFilter";

@Injectable()
export class BinderAsphaltConcreteSamplesService {
  private logger = new Logger(BinderAsphaltConcreteSamplesService.name);

  constructor(private readonly binderAsphaltConcrete_SamplesRepository: BinderAsphaltConcrete_SamplesRepository) {}

  async createSample(sample: CreateBinderAsphaltConcreteSampleDto): Promise<BinderAsphaltConcrete_Sample> {
    try {
      const sampleFound = await this.binderAsphaltConcrete_SamplesRepository.findOne({ name: sample.generalData.name })
      // verifica se existe uma sample com mesmo nome e userId no banco de dados
      if (sampleFound) throw new AlreadyExists(`Binder/concrete sample with name "${sample.generalData.name}"`);
      
      // cria uma amostra no banco de dados
      return this.binderAsphaltConcrete_SamplesRepository.create({
        ...sample,
        createdAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`error on create sample > [error]: ${error}`);
      throw error;
    }
  }

  // async getAllSamples(userId: string): Promise<BinderAsphaltConcrete_Sample[]> {
  //   try {
  //     // busca todas as amostras no banco de dados
  //     const samples = await this.binderAsphaltConcrete_SamplesRepository.find();

  //     // retorna as amostras encontradas que pertencem ao usuário
  //     return samples.filter((sample) => sample.generalData.userId === userId);
  //   } catch (error) {
  //     this.logger.error(`error on get all stabilized layers samples > [error]: ${error}`);

  //     throw error;
  //   }
  // }

  async getSample(sampleId: string): Promise<BinderAsphaltConcrete_Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sample = await this.binderAsphaltConcrete_SamplesRepository.findOne({ _id: sampleId });

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
      const samples = await this.binderAsphaltConcrete_SamplesRepository.findAllByFilter(queryFilter);

      // se não encontrar a amostra, retorna um erro
      if (samples.docs.length <= 0) throw new NotFound('Sample');

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

  async updateSample(sample: BinderAsphaltConcrete_Sample): Promise<BinderAsphaltConcrete_Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sampleFound = await this.binderAsphaltConcrete_SamplesRepository.findOne({ _id: sample._id });

      // se não encontrar a amostra, retorna um erro
      if (!sampleFound) throw new NotFound('Sample');

      // atualiza a amostra no banco de dados
      return this.binderAsphaltConcrete_SamplesRepository.findOneAndUpdate({ _id: sample._id }, sample);
    } catch (error) {
      this.logger.error(`error on update sample > [error]: ${error}`);

      throw error;
    }
  }

  async deleteSample(sampleId: string): Promise<BinderAsphaltConcrete_Sample> {
    try {
      // busca uma amostra com o id passado no banco de dados
      const sample = await this.binderAsphaltConcrete_SamplesRepository.findOne({ _id: sampleId });

      // se não encontrar a amostra, retorna um erro
      if (!sample) throw new NotFound('Sample');

      // deleta a amostra no banco de dados
      return this.binderAsphaltConcrete_SamplesRepository.findOneAndDelete({ _id: sampleId });
    } catch (error) {
      this.logger.error(`error on delete sample > [error]: ${error}`);

      throw error;
    }
  }
}
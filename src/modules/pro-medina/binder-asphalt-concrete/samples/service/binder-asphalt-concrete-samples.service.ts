import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AlreadyExists, NotFound } from "../../../../../utils/exceptions";
import { BinderAsphaltConcrete_SamplesRepository } from "../repository";
import { BinderAsphaltConcrete_Sample } from "../schemas";
import { CreateBinderAsphaltConcreteSampleDto } from "../dto/create-binder-asphalt-concrete-samples.dto";
import { CommonQueryFilter } from "../../../../../utils/queryFilter";

@Injectable()
export class BinderAsphaltConcreteSamplesService {
  private logger = new Logger(BinderAsphaltConcreteSamplesService.name);

  constructor(private readonly binderAsphaltConcrete_SamplesRepository: BinderAsphaltConcrete_SamplesRepository) {}

  async createSample(sample: CreateBinderAsphaltConcreteSampleDto): Promise<BinderAsphaltConcrete_Sample> {
    try {
      const sampleFound = await this.binderAsphaltConcrete_SamplesRepository.findOne({ 
        'generalData.name': sample.generalData.name 
      });

      if (sampleFound) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: `Binder/concrete sample with name "${sample.generalData.name}" already exists.`,
          },
          HttpStatus.CONFLICT,
        );
      }
      
      return this.binderAsphaltConcrete_SamplesRepository.create({
        ...sample,
        createdAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`error on create sample > [error]: ${error}`);
      throw error;
    }
  }

  async getAllSamples(options: { page: number; limit: number }): Promise<BinderAsphaltConcrete_Sample[]> {
    try {
      const samples = await this.binderAsphaltConcrete_SamplesRepository.findAll(options);
      return samples;
    } catch (error) {
      this.logger.error(`error on get all samples > [error]: ${error}`);
      throw error;
    }
  }

  async getSample(sampleId: string): Promise<BinderAsphaltConcrete_Sample> {
    try {
      const sample = await this.binderAsphaltConcrete_SamplesRepository.findOneById(sampleId);
      if (!sample) throw new NotFound('Sample');
      return sample;
    } catch (error) {
      this.logger.error(`error on get sample > [error]: ${error}`);
      throw error;
    }
  }

  async getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any> {
    try {
      const samples = await this.binderAsphaltConcrete_SamplesRepository.findAllByFilter(queryFilter);
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
      const sampleFound = await this.binderAsphaltConcrete_SamplesRepository.findOneById(sample._id);
      if (!sampleFound) throw new NotFound('Sample');
      return this.binderAsphaltConcrete_SamplesRepository.findOneAndUpdate({ _id: sample._id }, sample);
    } catch (error) {
      this.logger.error(`error on update sample > [error]: ${error}`);
      throw error;
    }
  }

  async deleteSample(sampleId: string): Promise<BinderAsphaltConcrete_Sample> {
    try {
      const sample = await this.binderAsphaltConcrete_SamplesRepository.findOneById(sampleId);
      if (!sample) throw new NotFound('Sample');
      return this.binderAsphaltConcrete_SamplesRepository.findOneAndDelete({ _id: sampleId });
    } catch (error) {
      this.logger.error(`error on delete sample > [error]: ${error}`);
      throw error;
    }
  }
}
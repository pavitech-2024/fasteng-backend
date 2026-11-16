import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AlreadyExists, NotFound } from '../../../../../utils/exceptions';
import { StabilizedLayers_SamplesRepository } from '../repository';
import { StabilizedLayers_Sample } from '../schemas';
import { CreateStabilizedLayersSampleDto } from '../dto/create-stabilized-layers-sample.dto';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';

@Injectable()
export class StabilizedLayersSamplesService {
  private logger = new Logger(StabilizedLayersSamplesService.name);

  constructor(private readonly stabilizedLayers_SamplesRepository: StabilizedLayers_SamplesRepository) {}

  async createSample(sample: CreateStabilizedLayersSampleDto): Promise<StabilizedLayers_Sample> {
    try {
      const sampleFound = await this.stabilizedLayers_SamplesRepository.findOne({ 
        'generalData.name': sample.generalData.name 
      });

      if (sampleFound) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: `Stabilized layer sample with name "${sample.generalData.name}" already exists.`,
          },
          HttpStatus.CONFLICT,
        );
      }

      return this.stabilizedLayers_SamplesRepository.create({
        ...sample,
        createdAt: new Date(),
      });
    } catch (error) {
      this.logger.error(`error on create sample > [error]: ${error}`);
      throw error;
    }
  }

  async getAllSamples(options: { page: number; limit: number }): Promise<any> {
    try {
      const samples = await this.stabilizedLayers_SamplesRepository.findAll(options);
      return samples;
    } catch (error) {
      this.logger.error(`error on get all stabilized layers samples > [error]: ${error}`);
      throw error;
    }
  }

  async getSample(sampleId: string): Promise<StabilizedLayers_Sample> {
    try {
      const sample = await this.stabilizedLayers_SamplesRepository.findOneById(sampleId);
      if (!sample) throw new NotFound('Sample');
      return sample;
    } catch (error) {
      this.logger.error(`error on get sample > [error]: ${error}`);
      throw error;
    }
  }

  async getSamplesByFilter(queryFilter: CommonQueryFilter): Promise<any> {
    try {
      const samples = await this.stabilizedLayers_SamplesRepository.findAllByFilter(queryFilter);
      return {
        docs: samples.docs,
        totalPages: samples.totalPages,
        count: samples.count,
      };
    } catch (error) {
      this.logger.error(`error on get sample > [error]: ${error}`);
      throw error;
    }
  }

  async updateSample(sample: StabilizedLayers_Sample): Promise<StabilizedLayers_Sample> {
    try {
      const sampleFound = await this.stabilizedLayers_SamplesRepository.findOneById(sample._id);
      if (!sampleFound) throw new NotFound('Sample');
      return this.stabilizedLayers_SamplesRepository.findOneAndUpdate({ _id: sample._id }, sample);
    } catch (error) {
      this.logger.error(`error on update sample > [error]: ${error}`);
      throw error;
    }
  }

  async deleteSample(sampleId: string): Promise<StabilizedLayers_Sample> {
    try {
      const sample = await this.stabilizedLayers_SamplesRepository.findOneById(sampleId);
      if (!sample) throw new NotFound('Sample');
      return this.stabilizedLayers_SamplesRepository.findOneAndDelete({ _id: sampleId });
    } catch (error) {
      this.logger.error(`error on delete sample > [error]: ${error}`);
      throw error;
    }
  }
}
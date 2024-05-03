import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../infra/mongoose/database.config";
import { CbrRepository } from "../../essays/cbr/repository";
import { CompressionRepository } from "../../essays/compression/repository";
import { HrbRepository } from "../../essays/hrb/repository";
import { SucsRepository } from "../../essays/sucs/repository";
import { Model } from "mongoose";
import { Sample, SampleDocument } from "../schemas";
import { GranulometryRepository } from "../../essays/granulometry/repository";

@Injectable()
export class GetEssaysBySample_Service {
  private logger = new Logger(GetEssaysBySample_Service.name);

  constructor(
    @InjectModel(Sample.name, DATABASE_CONNECTION.SOILS)
    private sampleModel: Model<SampleDocument>,
    private readonly granulometryRepository: GranulometryRepository,
    private readonly cbrRepository: CbrRepository,
    private readonly hrbRepository: HrbRepository,
    private readonly sucsRepository: SucsRepository,
    private readonly compressionRepository: CompressionRepository,
  ) {}

  async getEssaysBySample(sample: any) {
    try {
      this.logger.log({ sample }, 'start get essays by sample > soil > [service]');

      const { type, _id } = sample;

      // Pegar os tipos possíveis d eexperimentos
      const possiblesExperimentTypes = await this.findTypeExperiment(type);

      let essays = [];

      for (const essayName of possiblesExperimentTypes) {
        let essay = null;
        let response;

        // Acessando condicionamente o repositório correto para cada ensaio
        switch (essayName) {
          case 'granulometry':
            response = await this.granulometryRepository.findOne({ 'generalData.sample._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'cbr':
            response = await this.cbrRepository.findOne({ 'generalData.sample._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'hrb':
            response = await this.hrbRepository.findOne({ 'generalData.sample._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'sucs':
            response = await this.sucsRepository.findOne({ 'generalData.sample._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
          case 'compression':
            response = await this.compressionRepository.findOne({ 'generalData.sample._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          default:
            break;
        }

        if (essay) {
          essays.push(essay);
        }
      }

      return essays;
    } catch (error) {
      this.logger.error(`error on get essays of this sample > [error]: ${error}`);

      throw error;
    }
  }

  findTypeExperiment(typeSample): string[] {
    let possiblesExperimentTypes = [];

    switch (typeSample) {
      case 'inorganicSoil':
        possiblesExperimentTypes = ['granulometry', 'hrb', 'sucs', 'cbr', 'compression'];
        break;
      case 'organicSoil':
        possiblesExperimentTypes = ['granulometry', 'hrb', 'sucs', 'cbr', 'compression'];
        break;
      case 'pavimentLayer':
        possiblesExperimentTypes = ['granulometry', 'hrb', 'sucs', 'cbr', 'compression'];
        break;
      default:
        possiblesExperimentTypes = [];
        break;
    }

    return possiblesExperimentTypes;
  }
}
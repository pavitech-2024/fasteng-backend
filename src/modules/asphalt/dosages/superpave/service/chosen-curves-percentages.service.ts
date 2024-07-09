import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { Superpave, SuperpaveDocument } from '../schemas';

@Injectable()
export class ChosenCurvePercentages_Superpave_Service {
  private logger = new Logger(ChosenCurvePercentages_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository,
  ) {}

  async getStep7Parameters(body: any) {
    try {
      this.logger.log({ body }, 'start calculate step 5 gmm data > [service]');

      const { curve: choosenGranulometryComposition, trafficVolume } = body;

      let porcentageAggregate = [];
      let returnScreen7 = {};

      const listOfPlis = [
        choosenGranulometryComposition.expectedPli - 0.5,
        choosenGranulometryComposition.expectedPli,
        choosenGranulometryComposition.expectedPli + 0.5,
        choosenGranulometryComposition.expectedPli + 1,
      ];
      for (let i = 0; i < choosenGranulometryComposition.percentsOfDosage.length; i++) {
        porcentageAggregate.push([]);
        porcentageAggregate[i].push(
          ((100 - listOfPlis[0]) * choosenGranulometryComposition.percentsOfDosage[i]) / 100,
        );
        porcentageAggregate[i].push(
          ((100 - listOfPlis[1]) * choosenGranulometryComposition.percentsOfDosage[i]) / 100,
        );
        porcentageAggregate[i].push(
          ((100 - listOfPlis[2]) * choosenGranulometryComposition.percentsOfDosage[i]) / 100,
        );
        porcentageAggregate[i].push(
          ((100 - listOfPlis[3]) * choosenGranulometryComposition.percentsOfDosage[i]) / 100,
        );
        porcentageAggregate[i].reverse();
      }

      returnScreen7 = {
        porcentageAggregate,
        listOfPlis,
        trafficVolume,
      };
      return returnScreen7;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { Superpave, SuperpaveDocument } from '../schemas';

interface GranulometryComposition {
  expectedPli: number;
  [key: string]: number;
}

@Injectable()
export class ChosenCurvePercentages_Superpave_Service {
  private logger = new Logger(ChosenCurvePercentages_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpave_repository: SuperpaveRepository,
  ) {}

  async getStep7Parameters(body: any) {
    try {
      this.logger.log({ body }, 'start calculate step 5 gmm data > [service]');

      const { curve: choosenGranulometryComposition, trafficVolume, percentsOfDosage } = body;

      let porcentageAggregate = [];
      let returnScreen7 = {};

      // Apenas remove o termo lower/ average/ higher das keys do objeto
      const formattedGranulomtryComposition: GranulometryComposition = Object.keys(
        choosenGranulometryComposition,
      ).reduce((acc, key) => {
        const newKey = key.replace(/Lower|Average|Higher/g, '');
        acc[newKey] = choosenGranulometryComposition[key];
        return acc;
      }, {} as GranulometryComposition);

      let formattedPercentsOfDosage: number[] = []
      
      Object.values(percentsOfDosage).forEach((e: string) => formattedPercentsOfDosage.push(Number(e)))

      const listOfPlis = [
        formattedGranulomtryComposition.expectedPli - 0.5,
        formattedGranulomtryComposition.expectedPli,
        formattedGranulomtryComposition.expectedPli + 0.5,
        formattedGranulomtryComposition.expectedPli + 1,
      ];

      for (let i = 0; i < formattedPercentsOfDosage.length; i++) {
        porcentageAggregate.push([]);
        porcentageAggregate[i].push(((100 - listOfPlis[0]) * formattedPercentsOfDosage[i]) / 100);
        porcentageAggregate[i].push(((100 - listOfPlis[1]) * formattedPercentsOfDosage[i]) / 100);
        porcentageAggregate[i].push(((100 - listOfPlis[2]) * formattedPercentsOfDosage[i]) / 100);
        porcentageAggregate[i].push(((100 - listOfPlis[3]) * formattedPercentsOfDosage[i]) / 100);
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

  async savePercentsOfChosenCurveData(body: any, userId: string) {
    try {
      this.logger.log('save superpave chosen curve percentages step on chosen-curve-percentages.superpave.service.ts > [body]', { body });

      const { name } = body.chosenCurvePercentagesData;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...chosenCurvePercentagesWithoutName } = body.chosenCurvePercentagesData;

      const superpaveWithChosenCurvePercentages = { ...superpaveExists._doc, chosenCurvePercentagesData: chosenCurvePercentagesWithoutName };

      await this.superpaveModel.updateOne(
        { _id: superpaveExists._doc._id },
        superpaveWithChosenCurvePercentages
      );

      if (superpaveExists._doc.generalData.step < 8) {
        await this.superpave_repository.saveStep(superpaveExists, 8);
      }

      return true;
    } catch (error) {
      throw error
    }
  }
}

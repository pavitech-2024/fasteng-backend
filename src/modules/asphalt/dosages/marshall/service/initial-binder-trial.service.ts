import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';

@Injectable()
export class SetBinderTrial_Marshall_Service {
  private logger = new Logger(SetBinderTrial_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async calculateInitlaBinderTrial(body: any) {
    try {
      this.logger.log(
        'calculate marshall set initial binder trial step on initial-binder-trial.marshall.service.ts > [body]',
        { body },
      );
      

      const { trial, percentsOfDosage } = body;

      const newPercent = 100 - trial;
      const halfPlus = [];
      const halfLess = [];
      const onePlus = [];
      const oneLess = [];
      const percentOfDosage = [];
      const percentOfDosageToReturn = [];
      const newPercentOfDosage = [];

      for (let i = 0; i < percentsOfDosage.length; i++) {
        halfPlus.push(((newPercent - 0.5) * percentsOfDosage[i]) / 100);
        halfLess.push(((newPercent + 0.5) * percentsOfDosage[i]) / 100);
        onePlus.push(((newPercent - 1) * percentsOfDosage[i]) / 100);
        oneLess.push(((newPercent + 1) * percentsOfDosage[i]) / 100);
        percentOfDosage.push((newPercent * percentsOfDosage[i]) / 100);
        newPercentOfDosage.push([onePlus[i], halfPlus[i], percentOfDosage[i], halfLess[i], oneLess[i]]);
        percentOfDosageToReturn.push([oneLess[i], halfLess[i], percentOfDosage[i], halfPlus[i], onePlus[i]]);
      }
      percentOfDosageToReturn.push([trial - 1, trial - 0.5, trial, trial + 0.5, trial + 1]);

      const result = {
        trialAsphaltContent: trial,
        percentsOfDosage: newPercentOfDosage,
      };

      return { result };
    } catch (error) {
      throw error;
    }
  }
}

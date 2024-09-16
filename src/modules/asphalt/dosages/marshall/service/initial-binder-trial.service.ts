import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';
import { MaterialsRepository } from '../../../materials/repository/index';
import { ViscosityRotationalRepository } from '../../../essays/viscosityRotational/repository';

@Injectable()
export class SetBinderTrial_Marshall_Service {
  private logger = new Logger(SetBinderTrial_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly viscosityRepository: ViscosityRotationalRepository,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async calculateInitlaBinderTrial(body: any) {
    try {
      this.logger.log(
        'calculate marshall set initial binder trial step on initial-binder-trial.marshall.service.ts > [body]',
        { body },
      );

      const { trial, percentsOfDosages, binder } = body;

      const newPercent = 100 - trial;
      const halfPlus = [];
      const halfLess = [];
      const onePlus = [];
      const oneLess = [];
      const percentOfDosage = [];
      const percentOfDosageToReturn = [];
      const newPercentOfDosage = [];

      const modifiedPercentsOfDosages = [];

      const ids1 = new Set();

      Object.keys(percentsOfDosages[0]).forEach((key) => {
        const id = key.split('_')[1];
        ids1.add(id);
        const value = percentsOfDosages[0][key];
        const index = Array.from(ids1).indexOf(id);
        modifiedPercentsOfDosages[index] = { _id: id, value };
      });

      for (let i = 0; i < modifiedPercentsOfDosages.length; i++) {
        halfPlus.push({
          material: modifiedPercentsOfDosages[i]._id,
          value: ((newPercent - 0.5) * modifiedPercentsOfDosages[i].value) / 100,
          trial: 'halPlus',
        });
        halfLess.push({
          material: modifiedPercentsOfDosages[i]._id,
          value: ((newPercent + 0.5) * modifiedPercentsOfDosages[i].value) / 100,
          trial: 'halfLess',
        });
        onePlus.push({
          material: modifiedPercentsOfDosages[i]._id,
          value: ((newPercent - 1) * modifiedPercentsOfDosages[i].value) / 100,
          trial: 'onePlus',
        });
        oneLess.push({
          material: modifiedPercentsOfDosages[i]._id,
          value: ((newPercent + 1) * modifiedPercentsOfDosages[i].value) / 100,
          trial: 'oneLess',
        });
        percentOfDosage.push({
          material: modifiedPercentsOfDosages[i]._id,
          value: (newPercent * modifiedPercentsOfDosages[i].value) / 100,
          trial: 'normal'
        })
        newPercentOfDosage.push([onePlus[i].value, halfPlus[i].value, percentOfDosage[i].value, halfLess[i].value, oneLess[i].value]);
        percentOfDosageToReturn.push([oneLess[i], halfLess[i], percentOfDosage[i], halfPlus[i], onePlus[i]]);
      }
      percentOfDosageToReturn.push([
        { trial: 'oneLess', value: trial - 1 },
        { value: trial - 0.5, trial: 'halfLess' },
        { value: trial, trial: 'normal' },
        { value: trial + 0.5, trial: 'halfPlus' },
        { value: trial + 1, trial: 'onePlus' },
      ]);

      const bandsOfTemperatures = await this.getBandsOfTemperatures(binder);
      console.log(bandsOfTemperatures);

      const result = {
        bandsOfTemperatures,
        percentsOfDosage: percentOfDosageToReturn,
        newPercentOfDosage,
      };

      return { result };
    } catch (error) {
      throw error;
    }
  }

  async getBandsOfTemperatures(binder: any): Promise<any> {
    try {

      const resultRotational: any = await this.viscosityRepository.findOne({
        'generalData.material._id': binder,
      });

      if (!resultRotational) {
        throw new NotFoundException(`O ligante selecionado não passou por nenhum ensaio de viscosidade ainda.`);
      }

      const machiningTemperatureRange = {
        higher: resultRotational.results.machiningTemperatureRange.higher,
        average:
          (resultRotational.results.machiningTemperatureRange.higher +
            resultRotational.results.machiningTemperatureRange.lower) /
          2,
        lower: resultRotational.results.machiningTemperatureRange.lower,
      };

      const compressionTemperatureRange = {
        higher: resultRotational.results.compressionTemperatureRange.higher,
        average:
          (resultRotational.results.compressionTemperatureRange.higher +
            resultRotational.results.compressionTemperatureRange.lower) /
          2,
        lower: resultRotational.results.compressionTemperatureRange.lower,
      };

      let higherAggregateTemperature, lowerAggregateTemperature;
      if (resultRotational.results.machiningTemperatureRange.higher + 15 > 177) higherAggregateTemperature = 177;
      else higherAggregateTemperature = resultRotational.results.machiningTemperatureRange.higher + 15;
      if (resultRotational.results.machiningTemperatureRange.lower + 15 > 177) lowerAggregateTemperature = 177;
      else lowerAggregateTemperature = resultRotational.results.machiningTemperatureRange.lower + 15;

      const aggregateTemperatureRange = {
        higher: higherAggregateTemperature,
        average: (higherAggregateTemperature + lowerAggregateTemperature) / 2,
        lower: lowerAggregateTemperature,
      };

      return { machiningTemperatureRange, compressionTemperatureRange, aggregateTemperatureRange };
    } catch (error) {
      throw error;
    }
  }

  async saveStep4Data(body: any, userId: string) {
    try {
      this.logger.log('save marshall binder trial step on binder-trial.marshall.service.ts > [body]', { body });

      const { name } = body.binderTrialData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: materialName, ...binderTrialWithoutName } = body.binderTrialData;

      const marshallWithBinderTrial = { ...marshallExists._doc, binderTrialData: binderTrialWithoutName };

      await this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithBinderTrial);

      if (marshallExists._doc.generalData.step < 4) {
        await this.marshallRepository.saveStep(marshallExists, 4);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

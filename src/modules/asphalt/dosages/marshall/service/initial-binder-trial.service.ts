import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';
import { MaterialsRepository } from 'modules/asphalt/materials/repository';
import { ViscosityRotational, ViscosityRotationalDocument } from 'modules/asphalt/essays/viscosityRotational/schemas';
import { Material } from 'modules/asphalt/materials/schemas';
import { ViscosityRotationalRepository } from 'modules/asphalt/essays/viscosityRotational/repository';
import { SayboltFurolRepository } from 'modules/asphalt/essays/sayboltFurol/repository';
import { SayboltFurol } from 'modules/asphalt/essays/sayboltFurol/schemas';

@Injectable()
export class SetBinderTrial_Marshall_Service {
  private logger = new Logger(SetBinderTrial_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly viscosityRepository: ViscosityRotationalRepository,
    private readonly viscositySayboltFurol: SayboltFurolRepository,
    private readonly marshallRepository: MarshallRepository,
    private readonly materialsRepository: MaterialsRepository,
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
        modifiedPercentsOfDosages[index] = value;
      });

      const material_1 = Array.from(ids1)[0];
      const material_2 = Array.from(ids1)[1];

      const materials = await this.materialsRepository.find({ _id: { $in: [material_1, material_2] } });

      for (let i = 0; i < modifiedPercentsOfDosages.length; i++) {
        halfPlus.push(((newPercent - 0.5) * modifiedPercentsOfDosages[i]) / 100);
        halfLess.push(((newPercent + 0.5) * modifiedPercentsOfDosages[i]) / 100);
        onePlus.push(((newPercent - 1) * modifiedPercentsOfDosages[i]) / 100);
        oneLess.push(((newPercent + 1) * modifiedPercentsOfDosages[i]) / 100);
        percentOfDosage.push((newPercent * modifiedPercentsOfDosages[i]) / 100);
        newPercentOfDosage.push([onePlus[i], halfPlus[i], percentOfDosage[i], halfLess[i], oneLess[i]]);
        percentOfDosageToReturn.push([oneLess[i], halfLess[i], percentOfDosage[i], halfPlus[i], onePlus[i]]);
      }
      percentOfDosageToReturn.push([trial - 1, trial - 0.5, trial, trial + 0.5, trial + 1]);

      const bandsOfTemperatures = this.getBandsOfTemperatures(binder);

      const result = {
        bandsOfTemperatures,
        percentsOfDosage: percentOfDosageToReturn,
      };

      return { result };
    } catch (error) {
      throw error;
    }
  }


  async getBandsOfTemperatures(binder: any): Promise<any> {
    try {
      const material: Material = await this.materialsRepository.findById(binder);
      console.log('🚀 ~ SetBinderTrial_Marshall_Service ~ getBandsOfTemperatures ~ material:', material);

      let result;
      

      const resultRotational: ViscosityRotational = await this.viscosityRepository.findById(binder);

      if (!resultRotational) {
        const resultSayboltFurol: SayboltFurol = await this.viscositySayboltFurol.findById(binder);
        if (!resultSayboltFurol) {
          throw new NotFoundException(`O ligante selecionado não passou por nenhum ensaio de viscosidade ainda.`)
        } else {
          result = resultSayboltFurol;
        }
      } else {
        result = resultRotational;
      }


      const machiningTemperatureRange = {
        higher: result.results.data.machiningTemperatureRange.higher,
        average:
          (result.results.data.machiningTemperatureRange.higher + result.results.data.machiningTemperatureRange.lower) /
          2,
        lower: result.results.data.machiningTemperatureRange.lower,
      };

      const compressionTemperatureRange = {
        higher: result.results.data.compressionTemperatureRange.higher,
        average:
          (result.results.data.compressionTemperatureRange.higher +
            result.results.data.compressionTemperatureRange.lower) /
          2,
        lower: result.results.data.compressionTemperatureRange.lower,
      };

      let higherAggregateTemperature, lowerAggregateTemperature;
      if (result.results.data.machiningTemperatureRange.higher + 15 > 177) higherAggregateTemperature = 177;
      else higherAggregateTemperature = result.results.data.machiningTemperatureRange.higher + 15;
      if (result.results.data.machiningTemperatureRange.lower + 15 > 177) lowerAggregateTemperature = 177;
      else lowerAggregateTemperature = result.results.data.machiningTemperatureRange.lower + 15;

      const aggregateTemperatureRange = {
        higher: higherAggregateTemperature,
        average: (higherAggregateTemperature + lowerAggregateTemperature) / 2,
        lower: lowerAggregateTemperature,
      };

      // if (!material.experimentsUseds.some(exp => exp.type === "Viscosity" && exp._id.toString() === result._id.toString())) {
      //   dosage.dataEntry.experimentsUseds.push({ type: "Viscosity", _id: result._id });
      //   await dosage.save();
      // }

      // dosage.result.temperatures = { machiningTemperatureRange, compressionTemperatureRange, aggregateTemperatureRange };
      // await dosage.save();

      return { machiningTemperatureRange, compressionTemperatureRange, aggregateTemperatureRange };
    } catch (error) {
      throw error;
    }
  }
}

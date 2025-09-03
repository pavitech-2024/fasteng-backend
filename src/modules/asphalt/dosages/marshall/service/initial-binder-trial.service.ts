import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';
import { ViscosityRotationalRepository } from '../../../essays/viscosityRotational/repository';
import { CalculateBinderTrialInput, SaveStep4Body } from '../types/marshall.types';
import { handleError } from 'utils/error-handler';
import { BandsOfTemperaturesDTO } from '../dto/binder-trial-data.dto';
import { TypeGuardsUtil } from '../../../../../utils/services/type-guards.util';
import { TemperatureCalculationsUtil } from '../../../../../utils/services/temperature-calculations.util';
import { BinderTrialUtil } from '../../../../../utils/services/binder-trial.util';
import { TrialItem } from '../types/marshall.types';
import { PercentsMap } from '../types/marshall.types';
import { BINDER_TRIAL_MESSAGES } from '../../../../../utils/services/messages.constants';

@Injectable()
export class SetBinderTrial_Marshall_Service {
  private logger = new Logger(SetBinderTrial_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
    private readonly viscosityRepository: ViscosityRotationalRepository,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async calculateInitialBinderTrial(
    body: CalculateBinderTrialInput,
  ): Promise<{
    result: {
      bandsOfTemperatures: BandsOfTemperaturesDTO;
      percentsOfDosage: TrialItem[][];
      newPercentOfDosage: number[][];
    };
  }> {
    try {
      this.logger.log(BINDER_TRIAL_MESSAGES.CALCULATING_BINDER_TRIAL, { body });

      const { trial, binder } = body;
      const percentsList: PercentsMap[] = 'percentsOfDosages' in body ? body.percentsOfDosages : body.percentsOfDosage;
      const newPercent = 100 - trial;

      const modifiedPercents = BinderTrialUtil.normalizePercents(percentsList);
      const { percentOfDosageToReturn, newPercentOfDosage } = 
        BinderTrialUtil.calculateTrialValues(modifiedPercents, newPercent, trial);

      const bandsOfTemperatures = await this.getBandsOfTemperatures(binder);

      return {
        result: {
          bandsOfTemperatures,
          percentsOfDosage: percentOfDosageToReturn,
          newPercentOfDosage,
        },
      };
    } catch (error) {
      handleError(error, 'Failed to calculating initial binder trial');
      throw error;
    }
  }

  async getBandsOfTemperatures(binderId: string): Promise<BandsOfTemperaturesDTO> {
    try {
      const resultRotational = await this.viscosityRepository.findOne({
        'generalData.material._id': binderId,
      });

      if (!resultRotational) {
        throw new NotFoundException(BINDER_TRIAL_MESSAGES.VISCOSITY_NOT_FOUND);
      }

      const payload = TypeGuardsUtil.extractViscosityPayload(resultRotational);

      const machiningTemperatureRange = TemperatureCalculationsUtil.calculateTemperatureRange(
        payload.machiningTemperatureRange.higher,
        payload.machiningTemperatureRange.lower
      );

      const compressionTemperatureRange = TemperatureCalculationsUtil.calculateTemperatureRange(
        payload.compressionTemperatureRange.higher,
        payload.compressionTemperatureRange.lower
      );

      const AggregateTemperatureRange = TemperatureCalculationsUtil.calculateAggregateTemperatureRange(
        payload.machiningTemperatureRange.higher,
        payload.machiningTemperatureRange.lower
      );

      return {
        machiningTemperatureRange,
        compressionTemperatureRange,
        AggregateTemperatureRange,
      };
    } catch (error) {
      handleError(error, BINDER_TRIAL_MESSAGES.FETCHING_TEMPERATURES);
      throw error;
    }
  }

  async saveStep4Data(body: SaveStep4Body, userId: string): Promise<boolean> {
    try {
      this.logger.log(BINDER_TRIAL_MESSAGES.SAVING_STEP_4, { body, userId });

      const { name, ...binderTrialWithoutName } = body.binderTrialData;
      const marshallExists = await this.marshallRepository.findOne(name, userId);
      
      if (!marshallExists) throw new NotFoundException(BINDER_TRIAL_MESSAGES.MARSHALL_NOT_FOUND);

      marshallExists.set({ binderTrialData: binderTrialWithoutName });
      await marshallExists.save();

      if (marshallExists.step < 4) {
        await this.marshallRepository.saveStep(marshallExists._id, 4);
      }

      return true;
    } catch (error) {
      handleError(error, 'Error saving step 4 binder trial data');
      throw error;
    }
  }
}
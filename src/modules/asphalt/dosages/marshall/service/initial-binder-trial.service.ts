//Codigo puramente refatorado pra remover any dos bodytyps, juntamente com responses adequados
import { TemperatureRangeDTO, BandsOfTemperaturesDTO, BinderTrialDataDTO } from './../dto/binder-trial-data.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';
import { ViscosityRotationalRepository } from '../../../essays/viscosityRotational/repository';
import { CalculateBinderTrialInput, PercentsMap, SaveStep4Body, TrialItem, ViscosityPayload } from '../types/marshall.types';


function isViscosityPayload(x: unknown): x is ViscosityPayload {
  if (typeof x !== 'object' || x === null) return false;
  const obj = x as Record<string, unknown>;
  const mt = obj['machiningTemperatureRange'] as Record<string, unknown>;
  const ct = obj['compressionTemperatureRange'] as Record<string, unknown>;
  return (
    typeof mt?.higher === 'number' &&
    typeof mt?.lower === 'number' &&
    typeof ct?.higher === 'number' &&
    typeof ct?.lower === 'number'
  );
}

function extractViscosityPayload(res: unknown): ViscosityPayload {
  if (typeof res === 'object' && res !== null) {
    const r = res as Record<string, unknown>;
    if ('results' in r && isViscosityPayload((r as any).results)) return (r as any).results;
    if ('data' in r && isViscosityPayload((r as any).data)) return (r as any).data;
  }
  throw new Error('Formato inesperado do retorno do ViscosityRotationalRepository.');
}

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
      this.logger.log('Calculating Marshall initial binder trial', { body });

      const { trial, binder } = body;

      // aceitar tanto percentsOfDosages quanto percentsOfDosage
      const percentsList: PercentsMap[] =
        'percentsOfDosages' in body ? body.percentsOfDosages : body.percentsOfDosage;

      const newPercent = 100 - trial;

      const halfPlus: TrialItem[] = [];
      const halfLess: TrialItem[] = [];
      const onePlus: TrialItem[] = [];
      const oneLess: TrialItem[] = [];
      const percentOfDosage: TrialItem[] = [];
      const percentOfDosageToReturn: TrialItem[][] = [];
      const newPercentOfDosage: number[][] = [];

      const modifiedPercentsOfDosages: { _id: string; value: number }[] = [];
      const ids = new Set<string>();

      // normaliza o primeiro objeto do array em pares {_id, value}
      const first = percentsList[0] ?? {};
      Object.keys(first).forEach((key) => {
        const id = key.split('_')[1];
        if (!id) return;
        ids.add(id);
        const value = Number(first[key] ?? 0);
        const index = Array.from(ids).indexOf(id);
        modifiedPercentsOfDosages[index] = { _id: id, value };
      });

      for (let i = 0; i < modifiedPercentsOfDosages.length; i++) {
        const item = modifiedPercentsOfDosages[i];
        onePlus.push({ material: item._id, value: ((newPercent - 1) * item.value) / 100, trial: 'onePlus' });
        halfPlus.push({ material: item._id, value: ((newPercent - 0.5) * item.value) / 100, trial: 'halfPlus' });
        const normal = { material: item._id, value: (newPercent * item.value) / 100, trial: 'normal' } as const;
        halfLess.push({ material: item._id, value: ((newPercent + 0.5) * item.value) / 100, trial: 'halfLess' });
        oneLess.push({ material: item._id, value: ((newPercent + 1) * item.value) / 100, trial: 'oneLess' });

        percentOfDosage.push(normal as TrialItem);

        newPercentOfDosage.push([
          onePlus[i].value,
          halfPlus[i].value,
          normal.value,
          halfLess[i].value,
          oneLess[i].value,
        ]);

        // ordem de retorno: oneLess, halfLess, normal, halfPlus, onePlus
        percentOfDosageToReturn.push([oneLess[i], halfLess[i], normal as TrialItem, halfPlus[i], onePlus[i]]);
      }

      // linha extra com o teor de ligante para cada trial
      percentOfDosageToReturn.push([
        { trial: 'oneLess', value: trial - 1, material: 'binder' },
        { trial: 'halfLess', value: trial - 0.5, material: 'binder' },
        { trial: 'normal', value: trial, material: 'binder' },
        { trial: 'halfPlus', value: trial + 0.5, material: 'binder' },
        { trial: 'onePlus', value: trial + 1, material: 'binder' },
      ]);

      const bandsOfTemperatures = await this.getBandsOfTemperatures(binder);

      return {
        result: {
          bandsOfTemperatures,
          percentsOfDosage: percentOfDosageToReturn,
          newPercentOfDosage,
        },
      };
    } catch (error) {
      this.logger.error('Error calculating initial binder trial', error);
      throw error;
    }
  }

  async getBandsOfTemperatures(binderId: string): Promise<BandsOfTemperaturesDTO> {
    try {
      const resultRotational = await this.viscosityRepository.findOne({
        'generalData.material._id': binderId,
      });

      if (!resultRotational) {
        throw new NotFoundException(
          'O ligante selecionado não passou por nenhum ensaio de viscosidade ainda.',
        );
      }

      // aceita tanto {results: {...}} quanto {data: {...}}
      const payload = extractViscosityPayload(resultRotational);

      const machiningTemperatureRange: TemperatureRangeDTO = {
        higher: payload.machiningTemperatureRange.higher,
        average:
          (payload.machiningTemperatureRange.higher + payload.machiningTemperatureRange.lower) / 2,
        lower: payload.machiningTemperatureRange.lower,
      };

      const compressionTemperatureRange: TemperatureRangeDTO = {
        higher: payload.compressionTemperatureRange.higher,
        average:
          (payload.compressionTemperatureRange.higher + payload.compressionTemperatureRange.lower) /
          2,
        lower: payload.compressionTemperatureRange.lower,
      };

      // Agregado = (faixa de usinagem + 15°C), limitado a 177°C
      const higherAggregateTemperature = Math.min(
        payload.machiningTemperatureRange.higher + 15,
        177,
      );
      const lowerAggregateTemperature = Math.min(
        payload.machiningTemperatureRange.lower + 15,
        177,
      );

      const AggregateTemperatureRange: TemperatureRangeDTO = {
        higher: higherAggregateTemperature,
        average: (higherAggregateTemperature + lowerAggregateTemperature) / 2,
        lower: lowerAggregateTemperature,
      };

      // IMPORTANTE: usar "AggregateTemperatureRange" com A maiúsculo
      const bands: BandsOfTemperaturesDTO = {
        machiningTemperatureRange,
        compressionTemperatureRange,
        AggregateTemperatureRange,
      };

      return bands;
    } catch (error) {
      this.logger.error('Error fetching bands of temperatures', error);
      throw error;
    }
  }

  async saveStep4Data(body: SaveStep4Body, userId: string): Promise<boolean> {
    try {
      this.logger.log('Saving Marshall binder trial step 4', { body, userId });

      const { name, ...binderTrialWithoutName } = body.binderTrialData;

      const marshallExists = await this.marshallRepository.findOne(name, userId);
      if (!marshallExists) throw new NotFoundException('Marshall not found');

      // Atualiza só a parte do binderTrialData
      marshallExists.set({ binderTrialData: binderTrialWithoutName });
      await marshallExists.save();

      // step é na RAIZ do documento
      if (marshallExists.step < 4) {
        await this.marshallRepository.saveStep(marshallExists._id, 4);
      }

      return true;
    } catch (error) {
      this.logger.error('Error saving step 4 binder trial data', error);
      throw error;
    }
  }
}

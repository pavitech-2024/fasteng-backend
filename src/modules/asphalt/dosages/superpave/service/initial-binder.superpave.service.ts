import { Injectable, Logger } from '@nestjs/common';
import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';
import { SuperpaveRepository } from '../repository';
import { Model } from 'mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';

type CurveKey = 'lower' | 'average' | 'higher';

const CURVE_ORDER: CurveKey[] = ['lower', 'average', 'higher'];

/** Posição de cada curva dentro de percentsOfDosage (percentageInputs do step 4). */
const CURVE_INPUT_INDEX: Record<CurveKey, number> = { lower: 0, average: 1, higher: 2 };

/**
 * No código original a curva inferior usava (0.95 + 0.96) e as outras duas
 * (0.95 + 0.965). Mantive a diferença para não alterar resultados já validados.
 * Se for typo, unifique aqui.
 */
const VLA_FACTOR: Record<CurveKey, number> = {
  lower: 0.95 + 0.96,
  average: 0.95 + 0.965,
  higher: 0.95 + 0.965,
};

const TURN_NUMBER_BY_TRAFFIC: Record<
  string,
  { initialN: number; projectN: number; maxN: number; tex: string }
> = {
  low: { initialN: 6, projectN: 50, maxN: 75, tex: 'Muito leve (local)' },
  medium: { initialN: 7, projectN: 75, maxN: 115, tex: 'Médio (rodovias coletoras)' },
  'medium-high': {
    initialN: 8,
    projectN: 100,
    maxN: 160,
    tex: 'Médio a alto (vias principais, rodovias rurais)',
  },
  high: { initialN: 9, projectN: 125, maxN: 205, tex: 'Alto (interestaduais, muito pesado)' },
};

export interface SpecificMassEntry {
  bulk: number;
  apparent: number;
  absorption: number;
}

export interface CurveComposition {
  combinedGsb: number;
  combinedGsa: number;
  gse: number;
  vla: number;
  tmn: number;
  vle: number;
  mag: number;
  pli: number;
  percentsOfDosageWithBinder: number[];
  curve: CurveKey;
}

@Injectable()
export class InitialBinder_Superpave_Service {
  private logger = new Logger(InitialBinder_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly specificMassRepository: SpecifyMassRepository,
    private readonly superpave_repository: SuperpaveRepository,
  ) {}

  async getFirstCompressionSpecificMasses(body: any) {
    try {
      const { materials } = body;

      const materialsIds = (materials ?? []).map((element) => element._id).filter(Boolean);

      const specificMasses = [];

      for (const materialId of materialsIds) {
        const specificMassData = await this.specificMassRepository.findOne({
          'generalData.material._id': materialId,
        });

        if (specificMassData) {
          specificMasses.push(specificMassData);
        }
      }

      // O ligante já está incluído em materialsIds — a busca extra do original
      // passava o objeto inteiro como _id e nunca retornava nada.

      return { specificMasses };
    } catch (error) {
      throw error;
    }
  }

  async calculateStep5Data(body: any) {
    try {
      console.log('>>> VERSAO NOVA', body?.chosenCurves);
      this.logger.log({ chosenCurves: body?.chosenCurves }, 'start calculate step 5 data > [service]');

      const {
        specificMassesData,
        materials: materialsData,
        percentsOfDosage,
        chosenCurves,
        nominalSize,
        trafficVolume,
      } = body;

      if (!Array.isArray(chosenCurves) || chosenCurves.length === 0) {
        throw new Error('Nenhuma curva granulométrica foi selecionada.');
      }

      const binder = materialsData?.find((e) => e.type === 'asphaltBinder' || e.type === 'CAP');
      const binderSpecificMass = Number(binder?.realSpecificMass);

      if (!Number.isFinite(binderSpecificMass)) {
        throw new Error('Massa específica do ligante ausente ou inválida.');
      }

      // Aceita tanto o objeto completo do step 4 quanto o valor puro.
      const nominalSizeValue = Number(
        nominalSize && typeof nominalSize === 'object' ? nominalSize.value : nominalSize,
      );

      if (!Number.isFinite(nominalSizeValue)) {
        throw new Error('Tamanho nominal máximo ausente ou inválido.');
      }

      const listOfSpecificMasses = this.buildSpecificMassesList(specificMassesData, materialsData);

      if (listOfSpecificMasses.length === 0) {
        throw new Error('Nenhum agregado com massa específica informada.');
      }

      /**
       * O push é a única fonte de índice. A versão anterior empurrava o objeto
       * no fim do array mas escrevia em granulometryComposition[0|1|2] fixo, o
       * que estourava com "Cannot read properties of undefined" sempre que
       * menos de três curvas eram calculadas.
       */
      const granulometryComposition: CurveComposition[] = CURVE_ORDER.filter((curve) =>
        chosenCurves.includes(curve),
      ).map((curve) =>
        this.calculateCurveComposition(
          curve,
          percentsOfDosage?.[CURVE_INPUT_INDEX[curve]],
          listOfSpecificMasses,
          binderSpecificMass,
          nominalSizeValue,
        ),
      );

      const turnNumber = TURN_NUMBER_BY_TRAFFIC[trafficVolume] ?? {
        initialN: 0,
        projectN: 0,
        maxN: 0,
        tex: '',
      };

      return { granulometryComposition, turnNumber };
    } catch (error) {
      this.logger.error('Falha ao calcular step 5', error);
      throw error;
    }
  }

  /** Só agregados e fíler entram na lista — o ligante tem tratamento próprio. */
  private buildSpecificMassesList(specificMassesData: any[], materialsData: any[]): SpecificMassEntry[] {
    const isAggregate = (element: any) =>
      Boolean(element?.type?.includes('Aggregate')) || Boolean(element?.type?.includes('filler'));

    const source =
      Array.isArray(specificMassesData) && specificMassesData.length > 0 ? specificMassesData : materialsData;

    return (source ?? []).filter(isAggregate).map((element) => ({
      bulk: Number(element.realSpecificMass),
      apparent: Number(element.apparentSpecificMass),
      absorption: Number(element.absorption),
    }));
  }

  /**
   * Calcula a composição de UMA curva. Sem estado compartilhado e sem índice
   * externo: quem chama decide onde o resultado vai parar no array.
   */
  private calculateCurveComposition(
    curve: CurveKey,
    percentsOfDosage: Record<string, string | number> | undefined,
    listOfSpecificMasses: SpecificMassEntry[],
    binderSpecificMass: number,
    nominalSizeValue: number,
  ): CurveComposition {
    if (!percentsOfDosage || Object.keys(percentsOfDosage).length === 0) {
      throw new Error(`Porcentagens de dosagem ausentes para a curva "${curve}".`);
    }

    const percentsArray = Object.values(percentsOfDosage).map((value) => Number(value));

    const { denominatorGsb, denominatorGsa } = this.calculateDenominatorGsa_Gsb(
      listOfSpecificMasses,
      percentsOfDosage as Record<string, string>,
    );

    const combinedGsb = 100 / denominatorGsb;
    const combinedGsa = 100 / denominatorGsa;

    let absorve = 0;
    for (let i = 0; i < percentsArray.length; i++) {
      if (listOfSpecificMasses.length > i) {
        absorve += ((percentsArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
      }
    }

    const gse = combinedGsb + absorve * (combinedGsa - combinedGsb);

    const vla = (VLA_FACTOR[curve] / (0.05 / binderSpecificMass + 0.95 / gse)) * (1 / combinedGsb - 1 / gse);

    const tmn = nominalSizeValue / 24.384;

    // todo: remover esta condicional após resolver o problema do tamanho nominal
    const vle = tmn < 0.5 ? 0.081 : 0.081 - 0.02931 * Math.log(tmn);

    const mag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / gse);

    const pli =
      binderSpecificMass === 0 && mag === 0
        ? 0
        : ((binderSpecificMass * (vle + vla)) / (binderSpecificMass * (vle + vla) + mag)) * 100;

    const percentsOfDosageWithBinder = listOfSpecificMasses.map(
      (_, j) => ((100 - pli) * (percentsArray[j] ?? 0)) / 100,
    );

    return {
      combinedGsb,
      combinedGsa,
      gse,
      vla,
      tmn,
      vle,
      mag,
      pli,
      percentsOfDosageWithBinder,
      curve,
    };
  }

  /**
   * Calcula os denominadores das massas específicas combinadas (Gsb e Gsa)
   * a partir das massas dos agregados e das porcentagens de dosagem.
   *
   * ATENÇÃO: mantive o pareamento do código original (Gsb com a massa aparente
   * e Gsa com a real). Se a convenção do ensaio for a inversa, troque as duas
   * linhas abaixo — isso altera o resultado da dosagem.
   */
  calculateDenominatorGsa_Gsb(
    listOfSpecificMasses: { bulk: number; apparent: number }[],
    percentsOfDosage: Record<string, string>,
  ) {
    let denominatorGsb = 0;
    let denominatorGsa = 0;

    const materialKeys = Object.keys(percentsOfDosage);

    for (let i = 0; i < materialKeys.length; i++) {
      const entry = listOfSpecificMasses[i];
      if (!entry) continue;

      const percent = Number(percentsOfDosage[materialKeys[i]]);

      if (!Number.isFinite(percent) || !entry.apparent || !entry.bulk) {
        throw new Error(`Massa específica inválida para o material na posição ${i + 1}.`);
      }

      denominatorGsb += percent / entry.apparent;
      denominatorGsa += percent / entry.bulk;
    }

    if (denominatorGsb === 0 || denominatorGsa === 0) {
      throw new Error('Não foi possível calcular as massas específicas combinadas.');
    }

    return { denominatorGsb, denominatorGsa };
  }

  async saveInitialBinderStep(body: any, userId: string) {
    try {
      this.logger.log('save superpave initial binder step on initial-binder.superpave.service.ts > [body]', { body });

      const { name } = body.initialBinderData;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...initialBinderData } = body.initialBinderData;

      const superpaveWithInitialBinderData = {
        ...superpaveExists._doc,
        initialBinderData,
      };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithInitialBinderData);

      if (superpaveExists._doc.generalData.step < 5) {
        await this.superpave_repository.saveStep(superpaveExists, 5);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
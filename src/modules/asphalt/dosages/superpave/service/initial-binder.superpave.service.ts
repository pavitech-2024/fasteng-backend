import { Injectable, Logger } from '@nestjs/common';
import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';
import { SuperpaveRepository } from '../repository';
import { Model } from 'mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';

@Injectable()
export class InitialBinder_Superpave_Service {
  private logger = new Logger(InitialBinder_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly specificMassRepository: SpecifyMassRepository,
    private readonly superpave_repository: SuperpaveRepository
  ) {}

  async getFirstCompressionSpecificMasses(body: any) {
    try {
      const { materials } = body;

      const binder = materials.find((material) => material.type === 'asphaltBinder' || material.type === 'CAP');

      let materialsIds = [];
      let specificMasses = [];

      materials.forEach((element) => {
        materialsIds.push(element._id);
      });

      for (let i = 0; i < materialsIds.length; i++) {
        const specificMassData = await this.specificMassRepository.findOne({
          'generalData.material._id': materialsIds[i],
        });
        if (specificMassData) {
          specificMasses.push(specificMassData);
        }
      }

      const binderSpecificMass = await this.specificMassRepository.findOne({
        'generalData.material._id': binder,
      });

      if (binderSpecificMass) {
        specificMasses.push(binderSpecificMass);
      }

      const data = {
        specificMasses,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async calculateStep5Data(body: any) {
    try {
      const {
        specificMassesData,
        materials: materialsData,
        percentsOfDosage,
        chosenCurves,
        nominalSize,
        trafficVolume,
      } = body;

      let granulometryComposition: {
        combinedGsb: number;
        combinedGsa: number;
        gse: number;
        vla: number;
        tmn: number;
        vle: number;
        mag: number;
        pli: number;
        percentsOfDosageWithBinder: number[];
        curve: string;
      }[] = [];

      let listOfSpecificMasses = [];

      let turnNumber = {
        initialN: 0,
        projectN: 0,
        maxN: 0,
        tex: '',
      };

      const binderSpecificMass = Number(
        materialsData.find((e) => e.type === 'asphaltBinder' || e.type === 'CAP').realSpecificMass,
      );

      if (specificMassesData?.length > 0) {
        specificMassesData.forEach((element) => {
          if (element && (element.type.includes('Aggregate') || element.type.includes('filler'))) {
            listOfSpecificMasses.push({
              bulk: element.realSpecificMass,
              apparent: element.apparentSpecificMass,
              absorption: element.absorption,
            });
          }
        });
      } else {
        materialsData.forEach((element) => {
          const obj = {
            bulk: element.realSpecificMass,
            apparent: element.apparentSpecificMass,
            absorption: element.absorption,
          };
          listOfSpecificMasses.push(obj);
        });
      }

      // Cálculos para a curva inferior
      if (chosenCurves.includes('lower')) {
        // Pegar os percentuais específicos da curva inferior
        const lowerPercents = percentsOfDosage[0];
        
        const denominatorsLower = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, lowerPercents);

        const combinedGsb = 100 / denominatorsLower.denominatorGsb;
        const combinedGsa = 100 / denominatorsLower.denominatorGsa;

        granulometryComposition.push({
          combinedGsa,
          combinedGsb,
          gse: 0,
          vla: 0,
          tmn: 0,
          vle: 0,
          mag: 0,
          pli: 0,
          percentsOfDosageWithBinder: [],
          curve: 'lower',
        });

        let lowerAbsorve = 0;
        let percentsOfDosageArray = [];

        Object.values(lowerPercents).forEach((e) => {
          percentsOfDosageArray.push(e);
        });

        for (let i = 0; i < percentsOfDosageArray.length; i++) {
          if (listOfSpecificMasses.length > i) {
            lowerAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
          }
        }
        
        const lowerGse = combinedGsb + lowerAbsorve * (combinedGsa - combinedGsb);
        const lowerVla =
          ((0.95 + 0.96) / (0.05 / binderSpecificMass + 0.95 / lowerGse)) * (1 / combinedGsb - 1 / lowerGse);
        const lowerTmn = nominalSize.value / 24.384;

        //todo: remover esta condiccional após resolver o problema do tamanho nominal
        let lowerVle;
        if (lowerTmn < 0.5) {
          lowerVle = 0.081 - 0.02931 * 0;
        } else {
          lowerVle = 0.081 - 0.02931 * Math.log(lowerTmn);
        }

        const lowerMag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / lowerGse);
        const lowerPli =
          binderSpecificMass === 0 && lowerMag === 0
            ? 0
            : ((binderSpecificMass * (lowerVle + lowerVla)) /
                (binderSpecificMass * (lowerVle + lowerVla) + lowerMag)) *
              100;

        for (let j = 0; j < listOfSpecificMasses.length; j++) {
          granulometryComposition[0].percentsOfDosageWithBinder[j] =
            ((100 - lowerPli) * percentsOfDosageArray[j]) / 100;
        }

        granulometryComposition[0].gse = lowerGse;
        granulometryComposition[0].vla = lowerVla;
        granulometryComposition[0].tmn = lowerTmn;
        granulometryComposition[0].vle = lowerVle;
        granulometryComposition[0].mag = lowerMag;
        granulometryComposition[0].pli = lowerPli;
      }

      //Cálculos para a curva intermediária
      if (chosenCurves.includes('average')) {
        // Pegar os percentuais específicos da curva intermediária
        const averagePercents = percentsOfDosage[1];
        
        const denominatorsAverage = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, averagePercents);

        const combinedGsb = 100 / denominatorsAverage.denominatorGsb;
        const combinedGsa = 100 / denominatorsAverage.denominatorGsa;

        granulometryComposition.push({
          combinedGsb,
          combinedGsa,
          gse: 0,
          vla: 0,
          tmn: 0,
          vle: 0,
          mag: 0,
          pli: 0,
          percentsOfDosageWithBinder: [],
          curve: 'average',
        });

        let averageAbsorve = 0;
        let percentsOfDosageArray = [];

        Object.values(averagePercents).forEach((e) => {
          percentsOfDosageArray.push(e);
        });

        for (let i = 0; i < percentsOfDosageArray.length; i++) {
          if (listOfSpecificMasses.length > i) {
            averageAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
          }
        }

        const averageGse = combinedGsb + averageAbsorve * (combinedGsa - combinedGsb);
        const averageVla =
          ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / averageGse)) * (1 / combinedGsb - 1 / averageGse);

        const averageTmn = nominalSize.value / 24.384;

        //todo: remover esta condiccional após resolver o problema do tamanho nominal
        let averageVle;
        if (averageTmn < 0.5) {
          averageVle = 0.081 - 0.02931 * 0;
        } else {
          averageVle = 0.081 - 0.02931 * Math.log(averageTmn);
        }

        const averageMag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / averageGse);
        const averagePli =
          binderSpecificMass === 0 && averageMag === 0
            ? 0
            : ((binderSpecificMass * (averageVle + averageVla)) /
                (binderSpecificMass * (averageVle + averageVla) + averageMag)) *
              100;

        for (let j = 0; j < listOfSpecificMasses.length; j++) {
          granulometryComposition[1].percentsOfDosageWithBinder[j] =
            ((100 - averagePli) * percentsOfDosageArray[j]) / 100;
        }

        granulometryComposition[1].gse = averageGse;
        granulometryComposition[1].vla = averageVla;
        granulometryComposition[1].tmn = averageTmn;
        granulometryComposition[1].vle = averageVle;
        granulometryComposition[1].mag = averageMag;
        granulometryComposition[1].pli = averagePli;
      }

      //Cálculos para a curva superior
      if (chosenCurves.includes('higher')) {
        // Pegar os percentuais específicos da curva superior
        const higherPercents = percentsOfDosage[2];
        
        const denominatorsHigher = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, higherPercents);

        const combinedGsb = 100 / denominatorsHigher.denominatorGsb;
        const combinedGsa = 100 / denominatorsHigher.denominatorGsa;

        granulometryComposition.push({
          combinedGsb,
          combinedGsa,
          gse: 0,
          vla: 0,
          tmn: 0,
          vle: 0,
          mag: 0,
          pli: 0,
          percentsOfDosageWithBinder: [],
          curve: 'higher',
        });

        let higherAbsorve = 0;
        let percentsOfDosageArray = [];

        Object.values(higherPercents).forEach((e) => {
          percentsOfDosageArray.push(e);
        });

        for (let i = 0; i < percentsOfDosageArray.length; i++) {
          if (listOfSpecificMasses.length > i) {
            higherAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
          }
        }

        const higherGse = combinedGsb + higherAbsorve * (combinedGsa - combinedGsb);
        const higherVla =
          ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / higherGse)) * (1 / combinedGsb - 1 / higherGse);

        const higherTmn = nominalSize.value / 24.384;

        //todo: remover esta condiccional após resolver o problema do tamanho nominal
        let higherVle;
        if (higherTmn < 0.5) {
          higherVle = 0.081 - 0.02931 * 0;
        } else {
          higherVle = 0.081 - 0.02931 * Math.log(higherTmn);
        }

        const higherMag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / higherGse);
        const higherPli =
          binderSpecificMass === 0 && higherMag === 0
            ? 0
            : ((binderSpecificMass * (higherVle + higherVla)) /
                (binderSpecificMass * (higherVle + higherVla) + higherMag)) *
              100;

        for (let j = 0; j < listOfSpecificMasses.length; j++) {
          granulometryComposition[2].percentsOfDosageWithBinder[j] =
            ((100 - higherPli) * percentsOfDosageArray[j]) / 100;
        }

        granulometryComposition[2].gse = higherGse;
        granulometryComposition[2].vla = higherVla;
        granulometryComposition[2].tmn = higherTmn;
        granulometryComposition[2].vle = higherVle;
        granulometryComposition[2].mag = higherMag;
        granulometryComposition[2].pli = higherPli;
      }

      if (trafficVolume === 'low') {
        turnNumber.initialN = 6;
        turnNumber.projectN = 50;
        turnNumber.maxN = 75;
        turnNumber.tex = 'Muito leve (local)';
      } else if (trafficVolume === 'medium') {
        turnNumber.initialN = 7;
        turnNumber.projectN = 75;
        turnNumber.maxN = 115;
        turnNumber.tex = 'Médio (rodovias coletoras)';
      } else if (trafficVolume === 'medium-high') {
        turnNumber.initialN = 8;
        turnNumber.projectN = 100;
        turnNumber.maxN = 160;
        turnNumber.tex = 'Médio a alto (vias principais, rodovias rurais)';
      } else if (trafficVolume === 'high') {
        turnNumber.initialN = 9;
        turnNumber.projectN = 125;
        turnNumber.maxN = 205;
        turnNumber.tex = 'Alto (interestaduais, muito pesado)';
      }

      const data = {
        granulometryComposition,
        turnNumber,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Calculates the denominators for specific gravity of bulk (Gsb) and apparent (Gsa)
   * for a list of specific masses and their corresponding dosage percentages.
   *
   * @param listOfSpecificMasses - An array of objects, each containing bulk and apparent
   * specific gravity values as strings.
   * @param percentsOfDosage - An array of records where each record contains dosage
   * percentages for different materials, keyed by material identifiers.
   * @returns An object containing the calculated denominators for Gsb and Gsa.
   */
calculateDenominatorGsa_Gsb(
  listOfSpecificMasses: { bulk: number; apparent: number }[],
  percentsOfDosage: Record<string, string>
) {
  let denominatorGsb = 0;
  let denominatorGsa = 0;

  const materialKeys = Object.keys(percentsOfDosage);

  for (let i = 0; i < materialKeys.length; i++) {
    // REMOVA A DIVISÃO POR 100 AQUI
    const percent = Number(percentsOfDosage[materialKeys[i]]);

    const bulk = listOfSpecificMasses[i].bulk;
    const apparent = listOfSpecificMasses[i].apparent;

    denominatorGsb += percent / bulk;
    denominatorGsa += percent / apparent;
  }

  return {
    denominatorGsb,
    denominatorGsa
  };
}

  async saveInitialBinderStep(body: any, userId: string) {
    try {
      this.logger.log(
        'save superpave initial binder step on initial-binder.superpave.service.ts > [body]',
        { body },
      );

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
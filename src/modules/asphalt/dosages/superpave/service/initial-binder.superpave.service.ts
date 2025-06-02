import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from 'modules/asphalt/essays/granulometry/repository';
import { SuperpaveRepository } from '../repository';
import { GeneralData_Superpave_Service } from './general-data.superpave.service';
import { GranulometryComposition_Superpave_Service } from './granulometry-composition.superpave.service';
import { MaterialSelection_Superpave_Service } from './material-selection.superpave.service';
import { MaterialsRepository } from 'modules/asphalt/materials/repository';
import { SpecifyMassService } from 'modules/asphalt/essays/specifyMass/service';
import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';
import { Material } from 'modules/asphalt/materials/schemas';
import { SpecifyMass } from 'modules/asphalt/essays/specifyMass/schemas';

@Injectable()
export class InitialBinder_Superpave_Service {
  private logger = new Logger(InitialBinder_Superpave_Service.name);

  constructor(
    private readonly superpave_repository: SuperpaveRepository,
    private readonly generalData_Service: GeneralData_Superpave_Service,
    private readonly materialSelection_Service: MaterialSelection_Superpave_Service,
    private readonly granulometryComposition_Service: GranulometryComposition_Superpave_Service,
    private readonly asphaltMaterialRepository: MaterialsRepository,
    private readonly specificMassRepository: SpecifyMassRepository,
  ) {}

  async getStep5SpecificMasses(body: any) {
    try {
      const { materials, binder } = body;

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
        composition,
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
      }[] = [
        {
          combinedGsb: 0,
          combinedGsa: 0,
          gse: 0,
          vla: 0,
          tmn: 0,
          vle: 0,
          mag: 0,
          pli: 0,
          percentsOfDosageWithBinder: [],
        },
      ];

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
          if (element) {
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

      if (chosenCurves.lower) {
        const denominatorsLower = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);

        granulometryComposition[0].combinedGsb = 100 / denominatorsLower.denominatorGsb;
        granulometryComposition[0].combinedGsa = 100 / denominatorsLower.denominatorGsa;

        let lowerAbsorve = 0;

        let percentsOfDosageArray = [];

        Object.values(percentsOfDosage[0]).forEach((e) => {
          percentsOfDosageArray.push(e);
        });

        for (let i = 0; i < percentsOfDosageArray.length; i++) {
          lowerAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
          granulometryComposition[0].gse =
            granulometryComposition[0].combinedGsb +
            lowerAbsorve * (granulometryComposition[0].combinedGsa - granulometryComposition[0].combinedGsb);
          granulometryComposition[0].vla =
            ((0.95 + 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[0].gse)) *
            (1 / granulometryComposition[0].combinedGsb - 1 / granulometryComposition[0].gse);
          granulometryComposition[0].tmn = nominalSize.value / 24.384;

          //todo: remover esta condiccional após resolver o problema do tamanho nominal
          if (granulometryComposition[0].tmn < 0.5) {
            granulometryComposition[0].vle = 0.081 - 0.02931 * 0;
          } else {
            granulometryComposition[0].vle = 0.081 - 0.02931 * Math.log(granulometryComposition[0].tmn);
          }

          granulometryComposition[0].mag =
            (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[0].gse);
          granulometryComposition[0].pli =
            ((binderSpecificMass * (granulometryComposition[0].vle + granulometryComposition[0].vla)) /
              (binderSpecificMass * (granulometryComposition[0].vle + granulometryComposition[0].vla) +
                granulometryComposition[0].mag)) *
            100;

          for (let j = 0; j < listOfSpecificMasses.length; j++) {
            granulometryComposition[0].percentsOfDosageWithBinder[j] =
              ((100 - granulometryComposition[0].pli) * percentsOfDosageArray[j]) / 100;
          }
        }
      }

      //Cálculos para a curva intermediária caso tenha sido selecionada
      if (chosenCurves.average) {
        granulometryComposition[1] = {
          combinedGsb: 0,
          combinedGsa: 0,
          gse: 0,
          vla: 0,
          tmn: 0,
          vle: 0,
          mag: 0,
          pli: 0,
          percentsOfDosageWithBinder: [],
        };

        const denominatorsAverage = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);

        granulometryComposition[1].combinedGsb = 100 / denominatorsAverage.denominatorGsb;
        granulometryComposition[1].combinedGsa = 100 / denominatorsAverage.denominatorGsa;

        let averageAbsorve = 0;
        let percentsOfDosageArray = [];

        Object.values(percentsOfDosage[1]).forEach((e) => {
          percentsOfDosageArray.push(e);
        });

        for (let i = 0; i < percentsOfDosageArray.length; i++) {
          averageAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
        }

        granulometryComposition[1].gse =
          granulometryComposition[1].combinedGsb +
          averageAbsorve * (granulometryComposition[1].combinedGsa - granulometryComposition[1].combinedGsb);
        granulometryComposition[1].vla =
          ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[1].gse)) *
          (1 / granulometryComposition[1].combinedGsb - 1 / granulometryComposition[1].gse);

        granulometryComposition[1].tmn = nominalSize.value / 24.384;

        //todo: remover esta condiccional após resolver o problema do tamanho nominal
        if (granulometryComposition[1].tmn < 0.5) {
          granulometryComposition[1].vle = 0.081 - 0.02931 * 0;
        } else {
          granulometryComposition[1].vle = 0.081 - 0.02931 * Math.log(granulometryComposition[1].tmn);
        }

        granulometryComposition[1].mag =
          (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[1].gse);
        granulometryComposition[1].pli =
          ((binderSpecificMass * (granulometryComposition[1].vle + granulometryComposition[1].vla)) /
            (binderSpecificMass * (granulometryComposition[1].vle + granulometryComposition[1].vla) +
              granulometryComposition[1].mag)) *
          100;

        for (let j = 0; j < listOfSpecificMasses.length; j++) {
          granulometryComposition[1].percentsOfDosageWithBinder[j] =
            ((100 - granulometryComposition[1].pli) * percentsOfDosageArray[j]) / 100;
        }
      }

      //Cálculos para a curva intermediária caso tenha sido selecionada
      if (chosenCurves.higher) {
        granulometryComposition[2] = {
          combinedGsb: 0,
          combinedGsa: 0,
          gse: 0,
          vla: 0,
          tmn: 0,
          vle: 0,
          mag: 0,
          pli: 0,
          percentsOfDosageWithBinder: [],
        };

        const denominatorsAverage = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);

        granulometryComposition[2].combinedGsb = 100 / denominatorsAverage.denominatorGsb;
        granulometryComposition[2].combinedGsa = 100 / denominatorsAverage.denominatorGsa;

        let higherAbsorve = 0;
        let percentsOfDosageArray = [];

        Object.values(percentsOfDosage[2]).forEach((e) => {
          percentsOfDosageArray.push(e);
        });

        for (let i = 0; i < percentsOfDosageArray.length; i++) {
          higherAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
        }

        granulometryComposition[2].gse =
          granulometryComposition[2].combinedGsb +
          higherAbsorve * (granulometryComposition[2].combinedGsa - granulometryComposition[2].combinedGsb);
        granulometryComposition[2].vla =
          ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[2].gse)) *
          (1 / granulometryComposition[2].combinedGsb - 1 / granulometryComposition[2].gse);

        granulometryComposition[2].tmn = nominalSize.value / 24.384;

        //todo: remover esta condiccional após resolver o problema do tamanho nominal
        if (granulometryComposition[2].tmn < 0.5) {
          granulometryComposition[2].vle = 0.081 - 0.02931 * 0;
        } else {
          granulometryComposition[2].vle = 0.081 - 0.02931 * Math.log(granulometryComposition[2].tmn);
        }

        granulometryComposition[2].mag =
          (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[2].gse);
        granulometryComposition[2].pli =
          ((binderSpecificMass * (granulometryComposition[2].vle + granulometryComposition[2].vla)) /
            (binderSpecificMass * (granulometryComposition[2].vle + granulometryComposition[2].vla) +
              granulometryComposition[2].mag)) *
          100;

        for (let j = 0; j < listOfSpecificMasses.length; j++) {
          granulometryComposition[2].percentsOfDosageWithBinder[j] =
            ((100 - granulometryComposition[2].pli) * percentsOfDosageArray[j]) / 100;
        }
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

  calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage) {
    let denominatorGsb = 0;
    let denominatorGsa = 0;

    for (let j = 0; j < listOfSpecificMasses.length; j++) {
      denominatorGsb += percentsOfDosage[0].material_1 / listOfSpecificMasses[j].bulk;
      denominatorGsa += percentsOfDosage[0].material_2 / listOfSpecificMasses[j].apparent;
    }

    return { denominatorGsb, denominatorGsa };
  }
}

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

  async getStep4SpecificMasses(body: any) {
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

  async getStep4Data(body: any) {
    try {
      const {
        specificMassesData,
        materialsData,
        percentsOfDosage,
        chosenCurves,
        composition,
        binderSpecificMass,
        nominalSize,
        trafficVolume
      } = body;

      let listOfSpecificMasses = [];
      let combinedGsb;
      let combinedGsa;
      let gse;
      let vla;
      let tmn;
      let vle;
      let mag;
      let pli;
      let percentsOfDosageWithBinder = [];

      let turnNumber = {
        initialN: 0,
        projectN: 0,
        maxN: 0,
        tex: '',
      };

      if (specificMassesData?.length > 0) {
        specificMassesData.forEach((element: SpecifyMass) => {
          if (element) {
            listOfSpecificMasses.push({
              bulk: element.results.data.bulk_specify_mass,
              apparent: element.results.data.apparent_specify_mass,
              absorption: element.results.data.absorption,
            });
          }
        });
      } else {
        listOfSpecificMasses[0] = {
          bulk: materialsData[0].realSpecificMass,
          apparent: materialsData[0].apparentSpecificMass,
          absorption: materialsData[0].absorption,
        };
        listOfSpecificMasses[1] = {
          bulk: materialsData[1].realSpecificMass,
          apparent: materialsData[1].apparentSpecificMass,
          absorption: materialsData[1].absorption,
        };
      }

      if (chosenCurves.lower) {
        const denominatorsLower = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);

        combinedGsb = 100 / denominatorsLower.denominatorGsb;
        combinedGsa = 100 / denominatorsLower.denominatorGsa;

        let lowerAbsorve = 0;
        let percentsOfDosageArray = [percentsOfDosage[0].material_1, percentsOfDosage[0].material_2];

        for (let i = 0; i < percentsOfDosageArray.length; i++) {
          lowerAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
          gse = combinedGsb + lowerAbsorve * (combinedGsa - combinedGsb);
          vla = ((0.95 + 0.96) / (0.05 / binderSpecificMass + 0.95 / gse)) * (1 / combinedGsb - 1 / gse);
          tmn = nominalSize.value / 24.384;
          vle = 0.081 - 0.02931 * Math.log(tmn);
          mag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / gse);
          pli = ((binderSpecificMass * (vle + vla)) / (binderSpecificMass * (vle + vla) + mag)) * 100;

          for (let j = 0; j < listOfSpecificMasses.length; j++) {
            percentsOfDosageWithBinder[j] = ((100 - pli) * percentsOfDosageArray[j]) / 100;
          }
        }
      }

      if (trafficVolume === "VeryLight") {
        turnNumber.initialN = null;
        turnNumber.projectN = 50;
        turnNumber.maxN = 75;
        turnNumber.tex = "Muito leve (local)";
      } else if (trafficVolume === "Medium") {
        turnNumber.initialN = 7;
        turnNumber.projectN = 75;
        turnNumber.maxN = 115;
        turnNumber.tex = "Médio (rodovias coletoras)";
      } else if (trafficVolume === "MediumToHigh") {
        turnNumber.initialN = 8;
        turnNumber.projectN = 100;
        turnNumber.maxN = 160;
        turnNumber.tex = "Médio a alto (vias principais, rodovias rurais)";
      } else if (trafficVolume === "High") {
        turnNumber.initialN = 9;
        turnNumber.projectN = 125;
        turnNumber.maxN = 205;
        turnNumber.tex = "Alto (interestaduais, muito pesado)";
      }

      const data = {
        combinedGsb,
        combinedGsa,
        gse,
        vla,
        tmn,
        vle,
        mag,
        pli,
        percentsOfDosageWithBinder,
        turnNumber
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage) {
    console.log(
      '🚀 ~ InitialBinder_Superpave_Service ~ calculateDenominatorGsa_Gsb ~ percentsOfDosage:',
      percentsOfDosage,
    );
    let denominatorGsb = 0;
    let denominatorGsa = 0;

    for (let j = 0; j < listOfSpecificMasses.length; j++) {
      denominatorGsb += percentsOfDosage[0].material_1 / listOfSpecificMasses[j].bulk;
      denominatorGsa += percentsOfDosage[0].material_2 / listOfSpecificMasses[j].apparent;
    }

    return { denominatorGsb, denominatorGsa };
  }
}

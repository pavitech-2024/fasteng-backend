import { Injectable, Logger } from '@nestjs/common';
import { SuperpaveInitDto } from '../dto/superpave-init.dto';
import { GeneralData_Superpave_Service } from './general-data.superpave.service';
import { MaterialSelection_Superpave_Service } from './material-selection.superpave.service';
import { Superpave } from '../schemas';
import { SuperpaveRepository } from '../repository/index';
import { SuperpaveStep3Dto } from '../dto/step-3-superpave.dto';
import { GranulometryComposition_Superpave_Service } from './granulometry-composition.superpave.service';
import { AsphaltGranulometryRepository } from 'modules/asphalt/essays/granulometry/repository';
import { InitialBinder_Superpave_Service } from './initial-binder.superpave.service';
import { FirstCompression_Superpave_Service } from './first-compression.service';
import { FirstCurvePercentages_Service } from './first-curve-percentages.service';
import { ChosenCurvePercentages_Superpave_Service } from './chosen-curves-percentages.service';
import { SecondCompression_Superpave_Service } from './second-compression.superpave.service';
import { SecondCompressionParameters_Superpave_Service } from './second-compression-parameters.service';
import { ResumeDosage_Superpave_Service } from './resume-dosage.service';

@Injectable()
export class SuperpaveService {
  private logger = new Logger(SuperpaveService.name);

  constructor(
    private readonly superpave_repository: SuperpaveRepository,
    private readonly generalData_Service: GeneralData_Superpave_Service,
    private readonly materialSelection_Service: MaterialSelection_Superpave_Service,
    private readonly granulometryComposition_Service: GranulometryComposition_Superpave_Service,
    private readonly granulometryRepository: AsphaltGranulometryRepository,
    private readonly initialBinder_Service: InitialBinder_Superpave_Service,
    private readonly firstCompression_Service: FirstCompression_Superpave_Service,
    private readonly firstCurvePercentages_Service: FirstCurvePercentages_Service,
    private readonly chosenCurvePercentages_Service: ChosenCurvePercentages_Superpave_Service,
    private readonly secondCompression_Service: SecondCompression_Superpave_Service,
    private readonly secondCompressionParameters_Service: SecondCompressionParameters_Superpave_Service,
    private readonly resumeDosageEquation_Service: ResumeDosage_Superpave_Service,
  ) {}

  async verifyInitSuperpave(body: SuperpaveInitDto, userId: string) {
    try {
      const dosage = await this.generalData_Service.verifyInitSuperpave(body, userId);

      return dosage;
    } catch (error) {
      this.logger.error(`error on verify init > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getAllDosages(userId: string): Promise<Superpave[]> {
    try {
      // busca todas as dosagens no banco de dados
      const dosages = await this.superpave_repository.find();

      const userDosages = dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);

      // retorna as dosagens encontradas que pertencem ao usuário
      return userDosages;
    } catch (error) {
      this.logger.error(`error on get all dosages > [error]: ${error}`);

      throw error;
    }
  }

  async getUserMaterials(userId: string) {
    try {
      const materials = await this.materialSelection_Service.getMaterials(userId);

      this.logger.log(`materials returned > [materials]`);

      return { materials, success: true };
    } catch (error) {
      this.logger.error(`error on getting all materials by user id > [error]: ${error}`);
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  async getDosageById(dosageId: string) {
    try {
      const dosage = await this.generalData_Service.getDosageById(dosageId);

      this.logger.log(`dosage returned > [dosage]`);

      return { dosage, success: true };
    } catch (error) {
      this.logger.error(`error on getting dosage by id > [error]: ${error}`);
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  async saveMaterialSelectionStep(body: any, userId: string) {
    try {
      const result = await this.materialSelection_Service.saveMaterials(body, userId);
      return result;
    } catch (error) {
      this.logger.error(`Error saving material selection step: ${error.message}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep3Data(body: SuperpaveStep3Dto) {
    try {
      const { dnitBand, aggregates } = body;

      let higherBand = [];
      let lowerBand = [];
      let porcentagesPassantsN200 = [];
      let nominalSize = 0;
      let percentsOfMaterials = [];
      let listOfPercentsToReturn = [];
      let indexes = [];
      let index;
      let result = {
        nominalSize: {
          controlPoints: {
            lower: [],
            higher: [],
          },
          restrictedZone: {
            lower: [],
            higher: [],
          },
          curve: [],
          value: 0,
        },
        percentsOfMaterialsToShow: [],
        percentsOfMaterials: [],
      };

      const allGranulometrys = await this.granulometryRepository.findAll();

      const ids = aggregates.map((aggregate) => {
        return aggregate._id.toString();
      });

      const selectedGranulometrys = await this.granulometryRepository.findById(ids);

      const granulometryData: {
        _id: string;
        passants: {};
      }[] = [];

      aggregates.forEach((aggregate) => {
        const granulometry: any = allGranulometrys.find(({ generalData }) => {
          const { material } = generalData;
          return aggregate._id.toString() === material._id.toString();
        });

        const { passant } = granulometry.step2Data;

        let passants = {};

        passant.forEach((p) => {
          passants[p.sieve_label] = p.passant;
        });

        granulometryData.push({
          _id: aggregate._id,
          passants: passants,
        });
      });

      percentsOfMaterials = selectedGranulometrys.map((granulometry) => {
        if (granulometry.results.nominal_size > nominalSize) nominalSize = granulometry.results.nominal_size;
        return granulometry.results.passant;
      });

      result.nominalSize.value = nominalSize;

      for (let i = 0; i < selectedGranulometrys.length; i++) {
        porcentagesPassantsN200[i] = null;
        if (percentsOfMaterials[i][10] !== null) porcentagesPassantsN200[i] = percentsOfMaterials[i][10][1];
      }

      const axisX = [
        75, 64, 50, 37.5, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.6, 0.43, 0.3, 0.18, 0.15, 0.075, 0,
      ];

      const curve37 = [
        null,
        null,
        100,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
      ];
      const curve25 = [
        null,
        null,
        null,
        100,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
      ];
      const curve19 = [
        null,
        null,
        null,
        null,
        null,
        100,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
      ];
      const curve12 = [
        null,
        null,
        null,
        null,
        null,
        null,
        100,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
      ];
      const curve9 = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        100,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
      ];

      if (nominalSize === 37.5) {
        result.nominalSize.controlPoints.lower = [
          null,
          null,
          100,
          90,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          15,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
        ];

        result.nominalSize.controlPoints.higher = [
          null,
          null,
          null,
          100,
          null,
          90,
          null,
          null,
          null,
          null,
          null,
          41,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          6,
        ];

        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            34.7,
            23.3,
            null,
            15.5,
            11.7,
            null,
            10,
            null,
            null,
            null,
          ],
          axisX,
        );

        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            34.7,
            27.3,
            null,
            21.5,
            15.7,
            null,
            10,
            null,
            null,
            null,
          ],
          axisX,
        );

        result.nominalSize.curve = curve37;
      } else if (nominalSize === 25) {
        result.nominalSize.controlPoints.lower = [
          null,
          null,
          null,
          100,
          null,
          90,
          null,
          null,
          null,
          null,
          null,
          19,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
        ];
        result.nominalSize.controlPoints.higher = [
          null,
          null,
          null,
          null,
          null,
          100,
          90,
          null,
          null,
          null,
          null,
          45,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          7,
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            39.5,
            26.8,
            null,
            18.1,
            13.6,
            null,
            11.4,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            39.5,
            30.8,
            null,
            24.1,
            17.6,
            null,
            11.4,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.curve = curve25;
      } else if (nominalSize === 19) {
        result.nominalSize.controlPoints.lower = [
          null,
          null,
          null,
          null,
          null,
          100,
          90,
          null,
          null,
          null,
          null,
          23,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          2,
        ];
        result.nominalSize.controlPoints.higher = [
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          90,
          null,
          null,
          null,
          49,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          8,
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            34.6,
            null,
            22.3,
            16.7,
            null,
            13.7,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            34.6,
            null,
            28.3,
            20.7,
            null,
            13.7,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.curve = curve19;
      } else if (nominalSize === 12.5) {
        result.nominalSize.controlPoints.lower = [
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          90,
          null,
          null,
          null,
          28,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          2,
        ];
        result.nominalSize.controlPoints.higher = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          90,
          null,
          null,
          58,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          10,
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            39.1,
            null,
            25.6,
            19.1,
            null,
            15.5,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            39.1,
            null,
            31.6,
            23.1,
            null,
            15.5,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.curve = curve12;
      } else if (nominalSize === 9.5) {
        result.nominalSize.controlPoints.lower = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          90,
          null,
          null,
          32,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          2,
        ];
        result.nominalSize.controlPoints.higher = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          null,
          90,
          67,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          10,
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            47.2,
            null,
            31.6,
            23.5,
            null,
            18.7,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            47.2,
            null,
            37.6,
            27.5,
            null,
            18.7,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.curve = curve9;
      } else {
        result.nominalSize.controlPoints.lower = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          90,
          null,
          null,
          32,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          2,
        ];
        result.nominalSize.controlPoints.higher = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          null,
          90,
          67,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          10,
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            47.2,
            null,
            31.6,
            23.5,
            null,
            18.7,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            47.2,
            null,
            37.6,
            27.5,
            null,
            18.7,
            null,
            null,
            null,
          ],
          axisX,
        );
        result.nominalSize.curve = curve9;
      }

      for (let i = 0; i < percentsOfMaterials.length; i++) {
        for (let j = 0; j < percentsOfMaterials[i].length; j++) {
          if (percentsOfMaterials[i][j] !== null) {
            for (let k = j; k >= 0; k--) {
              percentsOfMaterials[i][k] = 100;
            }
            break;
          }
        }
      }

      for (let i = 0; i < percentsOfMaterials.length; i++) {
        listOfPercentsToReturn.push([]);
        for (let j = 0; j < percentsOfMaterials[i].length; j++) {
          listOfPercentsToReturn[i].push(null);
          if (percentsOfMaterials[i][j] === null) {
            for (let k = 0; k < percentsOfMaterials.length; k++) {
              percentsOfMaterials[k][j] = null;
            }
          }
        }
      }

      for (let i = 0; i < percentsOfMaterials.length; i++) {
        for (let j = 0; j < 20; j++) {
          if (percentsOfMaterials[i][j] !== 100 && percentsOfMaterials[i][j] !== null) {
            for (let k = j - 1; k >= 0; k--) {
              if (percentsOfMaterials[i][k] === 100) {
                indexes.push(k);
                break;
              }
            }
            break;
          }
        }
      }

      index = Math.min(...indexes);
      for (let i = 0; i < percentsOfMaterials.length; i++) {
        for (let j = 0; j < 20; j++) {
          if (j >= index) {
            listOfPercentsToReturn[i][j] = percentsOfMaterials[i][j];
          }
        }
      }

      result.percentsOfMaterialsToShow = listOfPercentsToReturn;
      result.percentsOfMaterials = percentsOfMaterials;

      if (dnitBand === 'A') {
        higherBand = [
          null,
          null,
          100,
          100,
          null,
          100,
          90,
          null,
          65,
          null,
          50,
          null,
          40,
          null,
          null,
          30,
          null,
          20,
          null,
          8,
        ];
        lowerBand = [null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1];
      } else if (dnitBand === 'B') {
        higherBand = [
          null,
          null,
          null,
          100,
          null,
          100,
          100,
          null,
          80,
          null,
          60,
          null,
          45,
          null,
          null,
          32,
          null,
          20,
          null,
          8,
        ];
        lowerBand = [
          null,
          null,
          null,
          100,
          null,
          95,
          80,
          null,
          45,
          null,
          28,
          null,
          20,
          null,
          null,
          10,
          null,
          8,
          null,
          3,
        ];
      } else if (dnitBand === 'C') {
        higherBand = [
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          100,
          90,
          null,
          72,
          null,
          50,
          null,
          null,
          26,
          null,
          16,
          null,
          10,
        ];
        lowerBand = [
          null,
          null,
          null,
          null,
          null,
          null,
          100,
          80,
          70,
          null,
          44,
          null,
          22,
          null,
          null,
          8,
          null,
          4,
          null,
          2,
        ];
      }

      const data = {
        nominalSize: result.nominalSize,
        percentsToList: listOfPercentsToReturn,
        porcentagesPassantsN200,
        bands: {
          letter: dnitBand,
          higher: higherBand,
          lower: lowerBand,
        },
      };

      return {
        data,
        success: true,
      };
    } catch (error) {
      this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async insertBlankPointsOnCurve(curve, axisX): Promise<any[]> {
    for (let k = 0; k < curve.length; k++) {
      if (curve[k] !== null) {
        for (let i = k; i < curve.length; i++) {
          if (curve[i] === null) {
            for (let j = i; j < curve.length; j++) {
              if (curve[j] !== null) {
                curve = this.findEquationOfCurve(curve, axisX, curve[i - 1], curve[j], axisX[i - 1], axisX[j], i);
                break;
              }
            }
          }
        }
      }
    }
    return curve;
  }

  async findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
    if (y1 !== y2) curve[i] = ((y2 - y1) / (x2 - x1)) * axisX[i] + (y1 * x2 - y2 * x1) / (x2 - x1);
    else curve[i] = y1;
    return curve;
  }

  async calculateStep3Data(body: any) {
    try {
      const granulometry = await this.granulometryComposition_Service.calculateGranulometry(body);

      return { data: granulometry.data, success: true };
    } catch (error) {
      this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveStep3Data(body: any, userId: string) {
    try {
      const success = await this.granulometryComposition_Service.saveStep3Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 3 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep4SpecificMasses(body: any) {
    try {
      const data = await this.initialBinder_Service.getStep4SpecificMasses(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 4 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep4Data(body: any) {
    try {
      const data = await this.initialBinder_Service.getStep4Data(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on save step 3 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveStep4Data(body: any, userId: string) {
    try {
      const success = await this.granulometryComposition_Service.saveStep4Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 4 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateGmm(body: any) {
    try {
      const gmm = await this.firstCompression_Service.calculateGmm(body);

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(`error on getting the step 5 rice test data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveStep5Data(body: any, userId: string) {
    try {
      const success = await this.firstCompression_Service.saveStep5Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 5 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep6Parameters(body: any) {
    try {
      const data = await this.firstCurvePercentages_Service.getStep6Parameters(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 6 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveStep6Data(body: any, userId: string) {
    try {
      const success = await this.firstCurvePercentages_Service.saveStep6Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 6 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep7Parameters(body: any) {
    try {
      const data = await this.chosenCurvePercentages_Service.getStep7Parameters(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 7 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveStep7Data(body: any, userId: string) {
    try {
      const success = await this.chosenCurvePercentages_Service.saveStep7Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 7 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateStep7RiceTest(body: any) {
    const { sampleAirDryMass, containerMassWaterSample, containerWaterMass, waterTemperatureCorrection } = body;
    try {
      const gmm = await this.secondCompression_Service.calculateStep7RiceTest(
        sampleAirDryMass,
        containerMassWaterSample,
        containerWaterMass,
        waterTemperatureCorrection,
      );

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(`error on getting the step 5 rice test data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateStep7Gmm(gmmData: any) {
    try {
      const gmm = await this.secondCompression_Service.calculateStep7Gmm(gmmData);

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(`error on getting the step 5 gmm data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateVolumetricParametersOfChoosenGranulometryComposition(body: any) {
    try {
      const gmm = await this.secondCompression_Service.calculateVolumetricParametersOfChoosenGranulometryComposition(
        body,
      );

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(
        `error on getting the step 7 volumetric parameters of choosen granulometry composition > [error]: ${error}`,
      );
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveStep8Data(body: any, userId: string) {
    try {
      const success = await this.secondCompression_Service.saveStep8Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 8 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep9Data(body: any) {
    try {
      const data = await this.secondCompressionParameters_Service.getStep9Data(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 9 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveStep9Data(body: any, userId: string) {
    try {
      const success = await this.secondCompressionParameters_Service.saveStep9Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 9 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateStep9RiceTest(body: any) {
    try {
      const data = await this.resumeDosageEquation_Service.calculateStep9RiceTest(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 9 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateVolumetricParametersOfConfirmGranulometryComposition(body: any) {
    try {
      const data =
        await this.resumeDosageEquation_Service.calculateVolumetricParametersOfConfirmGranulometryComposition(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on calculating dosage equation superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveStep10Data(body: any, userId: string) {
    try {
      const success = await this.resumeDosageEquation_Service.saveStep10Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 10 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveSuperpaveDosage(body: any, userId: string) {
    try {
      const success = await this.resumeDosageEquation_Service.saveSuperpaveDosage(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save superpave dosage > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async deleteSuperpaveDosage(id: string) {
    try {
      const success = await this.generalData_Service.deleteSuperpaveDosage(id);

      return { success };
    } catch (error) {
      this.logger.error(`error on delete superpave dosage > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }
}

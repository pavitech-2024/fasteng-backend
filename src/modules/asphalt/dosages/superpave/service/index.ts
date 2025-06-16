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
import { GranulometryEssay_Superpave_Service } from './granulometryEssay.service';
import { Calc_Superpave_GranulometyEssay_Dto } from '../dto/granulometry-essay.dto';
import { AsphaltGranulometryService } from 'modules/asphalt/essays/granulometry/service';
import { Calc_AsphaltGranulometry_Dto } from 'modules/asphalt/essays/granulometry/dto/asphalt.calc.granulometry.dto';
import { ViscosityRotationalService } from 'modules/asphalt/essays/viscosityRotational/service/viscosityRotational.service';
import { AllSievesSuperpaveUpdatedAstm } from 'utils/interfaces';

@Injectable()
export class SuperpaveService {
  private logger = new Logger(SuperpaveService.name);

  constructor(
    private readonly superpave_repository: SuperpaveRepository,
    private readonly generalData_Service: GeneralData_Superpave_Service,
    private readonly granulometryEssay_Service: GranulometryEssay_Superpave_Service,
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
    private readonly asphaltGranulometry_Service: AsphaltGranulometryService,
    private readonly rotationalViscosity_Service: ViscosityRotationalService,
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

  /**
   * Calcula a granulometria dos materiais de uma dosagem superpave.
   * @param body Objeto com as propriedades granulometrys (array de granulometrias) e viscosity (objeto de viscosidade).
   * @returns Um objeto com as propriedades granulometry (array de granulometrias calculadas) e success (booleano indicando se houve sucesso).
   * Caso haja erro, retorna um objeto com as propriedades error (objeto com status, name e message do erro) e success (false).
   */
  async calculateGranulometryEssayData(body: any) {
    try {
      const { granulometrys, viscosity } = body;

      const formattedBody: Calc_AsphaltGranulometry_Dto[] = granulometrys.map((item) => {
        const { material, material_mass, table_data, bottom } = item;
        return {
          generalData: material,
          step2Data: { material_mass, table_data, bottom },
        };
      });

      const results = await Promise.allSettled(
        formattedBody.map((dto) => this.asphaltGranulometry_Service.calculateGranulometry(dto)),
      );

      const granulometry = results
        .map((result, index) => {
          if (result.status === 'fulfilled') {
            return {
              ...result.value,
              material: granulometrys[index].material,
            };
          } else {
            this.logger.warn(
              `Failed to calculate material ${granulometrys[index].material?.name || index}: ${result.reason}`,
            );
            return null;
          }
        })
        .filter(Boolean); // remove os nulos

      const data = { viscosityRotational: viscosity, generalData: viscosity.material };
      const viscosityResult = await this.rotationalViscosity_Service.calculateViscosityRotational(data);

      return { granulometry, viscosity: { material: viscosity.material, result: viscosityResult }, success: true };
    } catch (error) {
      this.logger.error(`error on calculate granulometry essay data > [error]: ${error}`);
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  async saveGranulometryEssayStep(body: any, userId: string) {
    try {
      const result = await this.granulometryEssay_Service.saveGranulometryEssay(body, userId);
      return result;
    } catch (error) {
      this.logger.error(`Error saving granulometry essay step: ${error.message}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
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

  async getGranulometricCompositionData(body: any) {
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

      const granulometryData: {
        _id: string;
        passants: {};
      }[] = [];

      aggregates.forEach((aggregate) => {
        const { table_data } = aggregate.data;

        let passants = {};

        table_data.forEach((p) => {
          passants[p.sieve_label] = p.passant;
        });

        granulometryData.push({
          _id: aggregate.data.material._id,
          passants: passants,
        });
      });

      percentsOfMaterials = aggregates.map((granulometry) => {
        if (granulometry.results.result.nominal_size > nominalSize) {
          nominalSize = granulometry.results.result.nominal_size;
        }

        return granulometry.results.result.passant;
      });

      result.nominalSize.value = nominalSize;

      for (let i = 0; i < aggregates.length; i++) {
        porcentagesPassantsN200[i] = null;
        // ?: Por que exatamente a peneira do índice 10?
        // peneiras antigas: o índice 10 é o meio da lista (4.8). O equivalente nas novas peneiras seria o índice 6 (4.8);
        // if (percentsOfMaterials[i][10] !== null) porcentagesPassantsN200[i] = percentsOfMaterials[i][10][1];
        if (percentsOfMaterials[i][6] !== null) porcentagesPassantsN200[i] = percentsOfMaterials[i][6][1];
      }

      // const axisX = [
      //   75, 64, 50, 37.5, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.6, 0.43, 0.3, 0.18, 0.15, 0.075, 0,
      // ];
      const axisX = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];

      // const curve37 = [
      //   null,
      //   null,
      //   100,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   0,
      // ];
      const curve37_5 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve37_5[0] = 100; // 38.1 mm (1 1/2 pol)
      curve37_5[curve37_5.length - 1] = 0;

      // const curve25 = [
      //   null,
      //   null,
      //   null,
      //   100,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   0,
      // ];
      const curve25 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve25[0] = 100; // 25.4 mm (1 pol)
      curve25[curve25.length - 1] = 0;

      // const curve19 = [
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   100,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   0,
      // ];
      const curve19 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve19[1] = 100; // 19.1 mm (3/4 pol)
      curve19[curve19.length - 1] = 0;

      // const curve12 = [
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   100,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   0,
      // ];
      const curve12 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve12[2] = 100; // 12.7 mm (1/2 pol)
      curve12[curve12.length - 1] = 0;

      // const curve9 = [
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   100,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   0,
      // ];
      const curve9 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve9[3] = 100; // 9.5 mm (3/8 pol)
      curve9[curve9.length - 1] = 0;

      if (nominalSize === 37.5) {
        result.nominalSize.controlPoints.lower = 
        // [
        //   null,
        //   null,
        //   100, // 50
        //   90, // 37.5
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   15, // idx 11
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   0,
        // ];
        [
          100,
          90,
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
          0
        ]

        result.nominalSize.controlPoints.higher = 
        // [
        //   null,
        //   null,
        //   null,
        //   100, // 37.5
        //   null,
        //   90, // 25
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   41, // i 11
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   null,
        //   6,
        // ];
        [
          100,
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
          6
        ]

        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   34.7, // i 10
          //   23.3,
          //   null,
          //   15.5, // i 13
          //   11.7,
          //   null,
          //   10,
          //   null,
          //   null,
          //   null,
          // ],
          [
            null,
            null,
            null,
            null,
            null,
            null,
            34.7,
            23.3,
            15.5,
            11.7,
            10,
            null,
            null,
          ],
          axisX,
        );

        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   34.7,
          //   27.3,
          //   null,
          //   21.5,
          //   15.7,
          //   null,
          //   10,
          //   null,
          //   null,
          //   null,
          // ],
          [
            null,
            null,
            null,
            null,
            null,
            null,
            34.7,
            27.3,
            21.5,
            15.7,
            10,
            null,
            null,
          ],
          axisX,
        );

        result.nominalSize.curve = curve37_5;
      } else if (nominalSize === 25) {
        result.nominalSize.controlPoints.lower =
          // [
          //   null,
          //   null,
          //   null,
          //   100, --> 37.5
          //   null,
          //   90, --> 25
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   19, --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   1, --> 0.075
          // ];
          [
            100, // 38.1
            90, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            19, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            1, // 0.075
          ];
        result.nominalSize.controlPoints.higher =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 25
          //   90, --> 19
          //   null,
          //   null,
          //   null,
          //   null,
          //   45, --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   7, --> 0.075
          // ];
          [
            null, // 38.1
            100, // 25.4
            900, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            45, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            7, // 0.075
          ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   39.5, --> 4.8
          //   26.8, --> 2.4
          //   null,
          //   18.1, --> 1.2
          //   13.6, --> 0.6
          //   null,
          //   11.4, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            39.5, // 4.8
            26.8, // 2.36
            18.1, // 1.18
            13.6, // 0.6
            11.4, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   39.5, --> 4.8
          //   30.8, --> 2.4
          //   null,
          //   24.1, --> 1.2
          //   17.6, --> 0.6
          //   null,
          //   11.4, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            39.5, // 4.8
            30.8, // 2.36
            24.1, // 1.18
            17.6, // 0.6
            13.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.curve = curve25;
      } else if (nominalSize === 19) {
        result.nominalSize.controlPoints.lower =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100,  ---> 25
          //   90, -->-- 19
          //   null,
          //   null,
          //   null,
          //   null,
          //   23, --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   2, --> 0.075
          // ];
          [
            null, // 38.1
            100, // 25.4
            90, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            23, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            2, // 0.075
          ];
        // [null, null, 100, 90, null, null, null, 15, null, null, null, null, null];
        result.nominalSize.controlPoints.higher =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 19
          //   90, --> 12.5
          //   null,
          //   null,
          //   null,
          //   49, --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   8, --> 0.075
          // ];
          [
            null, // 38.1
            null, // 25.4
            100, // 19.1
            90, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            49, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            8, // 0.075
          ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   34.6, --> 2.4
          //   null,
          //   22.3, --> 1.2
          //   16.7, --> 0.6
          //   null,
          //   13.7, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            34.6, // 2.36
            22.3, // 1.18
            16.7, // 0.6
            13.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   34.6, --> 2.4
          //   null,
          //   28.3, --> 1.2
          //   20.7, --> 0.6
          //   null,
          //   13.7, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            34.6, // 2.36
            28.3, // 1.18
            20.7, // 0.6
            13.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.curve = curve19;
      } else if (nominalSize === 12.5) {
        result.nominalSize.controlPoints.lower =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 19
          //   90, --> 12.5
          //   null,
          //   null,
          //   null,
          //   28,  --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   2, --> 0.075
          // ];
          [
            null, // 38.1
            null, // 25.4
            100, // 19.1
            90, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            28, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            2, // 0.075
          ];
        // [null, null, null, 100, 90, null, null, null, null, null, 15, null, null];
        result.nominalSize.controlPoints.higher =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 12.5
          //   90, --> 9.5
          //   null,
          //   null,
          //   58, --> 4.8
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   10, --> 0.075
          // ];
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            100, // 12.7
            90, // 9.5
            null, // 6.3
            null, // 4.8
            58, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            10, // 0.075
          ];
        // [null, null, null, null, 100, null, null, null, null, null, 41, 6, null];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   39.1, --> 2.4
          //   null,
          //   25.6, --> 1.2
          //   19.1, --> 0.6
          //   null,
          //   15.5, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            39.1, // 2.36
            25.6, // 1.18
            19.1, // 0.6
            15.5, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, 34.7, 23.3, null, 15.5, 11.7, null],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   39.1, --> 2.4
          //   null,
          //   31.6, --> 1.2
          //   23.1, --> 0.6
          //   null,
          //   15.5, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            39.1, // 2.36
            31.6, // 1.18
            23.1, // 0.6
            15.5, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, 34.7, 27.3, null, 21.5, 15.7, null],
          axisX,
        );
        result.nominalSize.curve = curve12;
      } else if (nominalSize === 9.5) {
        result.nominalSize.controlPoints.lower =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 12.5
          //   90,  --> 9.5
          //   null,
          //   null,
          //   32,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   2, --> 0.075
          // ];
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            100, // 12.7
            90, // 9.5
            null, // 6.3
            null, // 4.8
            32, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            2, // 0.075
          ];
        result.nominalSize.controlPoints.higher =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 9.5
          //   null,
          //   90, --> 4.8
          //   67, --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   10, --> 0.075
          // ];
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            100, // 9.5
            null, // 6.3
            90, // 4.8
            67, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            10, // 0.075
          ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   47.2, --> 2.0
          //   null,
          //   31.6, --> 0.6
          //   23.5, --> 0.43
          //   null,
          //   18.7, --> 0.18
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            47.2, // 2.36
            31.6, // 1.18
            23.1, // 0.6
            18.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, null, 34.7, 23.3, null, 15.5, 11.7],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   47.2, --> 2.4
          //   null,
          //   37.6, --> 1.2
          //   27.5, --> 0.6
          //   null,
          //   18.7, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            47.2, // 2.36
            37.6, // 1.18
            37.5, // 0.6
            18.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, null, 34.7, 27.3, null, 21.5, 15.7],
          axisX,
        );
        result.nominalSize.curve = curve9;
      } else {
        result.nominalSize.controlPoints.lower =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 12.5
          //   90, --> 9.5
          //   null,
          //   null,
          //   32, --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   2, --> 0.075
          // ];
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            100, // 12.7
            90, // 9.5
            null, // 6.3
            null, // 4.8
            32, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            2, // 0.075
          ];
        result.nominalSize.controlPoints.higher =
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   100, --> 9.5
          //   null,
          //   90,  -> 4.8
          //   67, --> 2.4
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   10, --> 0.075
          // ];
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            100, // 9.5
            null, // 6.3
            90, // 4.8
            67, // 2.36
            null, // 1.18
            null, // 0.6
            null, // 0.3
            null, // 0.15
            10, // 0.075
          ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   47.2, --> 2.4
          //   null,
          //   31.6, --> 1.2
          //   23.5, --> 0.6
          //   null,
          //   18.7, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            47.2, // 2.36
            31.6, // 1.18
            23.5, // 0.6
            18.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          // [
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   47.2, --> 2.4
          //   null,
          //   37.6, --> 1.2
          //   27.5, --> 0.6
          //   null,
          //   18.7, --> 0.3
          //   null,
          //   null,
          //   null,
          // ],
          [
            null, // 38.1
            null, // 25.4
            100, // 19.1
            90, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            47.2, // 2.36
            37.6, // 1.18
            27.5, // 0.6
            18.7, // 0.3
            null, // 0.15
            null, // 0.075
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
        for (let j = 0; j < 13; j++) {
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
        for (let j = 0; j < 13; j++) {
          if (j >= index) {
            listOfPercentsToReturn[i][j] = percentsOfMaterials[i][j];
          }
        }
      }

      result.percentsOfMaterialsToShow = listOfPercentsToReturn;
      result.percentsOfMaterials = percentsOfMaterials;

      if (dnitBand === 'A') {
        higherBand = [
          100, //sieve 1 1/2 pol - 38,1 mm
          100, //sieve 1 pol - 25,4 mm
          89, //sieve 3/4 pol - 19,1 mm
          78, //sieve 1/2 pol - 12,7 mm
          71, //sieve 3/8 pol - 9,5 mm
          61, //sieve 1/4 pol - 6,3 mm
          55, //sieve N° 4 - 4,8 mm
          45, //sieve N° 8 - 2,36 mm
          36, //sieve N° 16 - 1,18 mm
          28, //sieve N° 30 - 0,60 mm
          21, //sieve N° 50 - 0,30 mm
          14, //sieve N° 100 - 0,150 mm
          7, //sieve N° 200 - 0,075 mm
        ];
        lowerBand = [
          100, //sieve 1 1/2 pol - 38,1 mm
          90, //sieve 1 pol - 25,4 mm
          75, //sieve 3/4 pol - 19,1 mm
          58, //sieve 1/2 pol - 12,7 mm
          48, //sieve 3/8 pol - 9,5 mm
          35, //sieve 1/4 pol - 6,3 mm
          29, //sieve N° 4 - 4,8 mm
          19, //sieve N° 8 - 2,36 mm
          13, //sieve N° 16 - 1,18 mm
          9, //sieve N° 30 - 0,60 mm
          5, //sieve N° 50 - 0,30 mm
          2, //sieve N° 100 - 0,150 mm];
          1, //sieve N° 200 - 0,075 mm
        ];
      } else if (dnitBand === 'B') {
        higherBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          100, //sieve 1 pol - 25,4 mm
          100, //sieve 3/4 pol - 19,1 mm
          89, //sieve 1/2 pol - 12,7 mm
          82, //sieve 3/8 pol - 9,5 mm
          70, //sieve 1/4 pol - 6,3 mm
          63, //sieve N° 4 - 4,8 mm
          49, //sieve N° 8 - 2,36 mm
          37, //sieve N° 16 - 1,18 mm
          28, //sieve N° 30 - 0,60 mm
          20, //sieve N° 50 - 0,30 mm
          13, //sieve N° 100 - 0,150 mm
          8, //sieve N° 200 - 0,075 mm
        ];
        lowerBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          100, //sieve 1 pol - 25,4 mm
          90, //sieve 3/4 pol - 19,1 mm
          70, //sieve 1/2 pol - 12,7 mm
          55, //sieve 3/8 pol - 9,5 mm
          42, //sieve 1/4 pol - 6,3 mm
          35, //sieve N° 4 - 4,8 mm
          23, //sieve N° 8 - 2,36 mm
          16, //sieve N° 16 - 1,18 mm
          10, //sieve N° 30 - 0,60 mm
          6, //sieve N° 50 - 0,30 mm
          4, //sieve N° 100 - 0,150 mm
          2, //sieve N° 200 - 0,075 mm
        ];
      } else if (dnitBand === 'C') {
        higherBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          null, //sieve 1 pol - 25,4 mm
          100, //sieve 3/4 pol - 19,1 mm
          100, //sieve 1/2 pol - 12,7 mm
          89, //sieve 3/8 pol - 9,5 mm
          78, //sieve 1/4 pol - 6,3 mm
          72, //sieve N° 4 - 4,8 mm
          58, //sieve N° 8 - 2,36 mm
          45, //sieve N° 16 - 1,18 mm
          35, //sieve N° 30 - 0,60 mm
          25, //sieve N° 50 - 0,30 mm
          17, //sieve N° 100 - 0,150 mm
          10, //sieve N° 200 - 0,075 mm
        ];
        lowerBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          null, //sieve 1 pol - 25,4 mm
          100, //sieve 3/4 pol - 19,1 mm
          90, //sieve 1/2 pol - 12,7 mm
          73, //sieve 3/8 pol - 9,5 mm
          53, //sieve 1/4 pol - 6,3 mm
          44, //sieve N° 4 - 4,8 mm
          28, //sieve N° 8 - 2,36 mm
          17, //sieve N° 16 - 1,18 mm
          11, //sieve N° 30 - 0,60 mm
          6, //sieve N° 50 - 0,30 mm
          4, //sieve N° 100 - 0,150 mm
          2, //sieve N° 200 - 0,075 mm
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

  async calculateGranulometricCompositionData(body: any) {
    try {
      const granulometry = await this.granulometryComposition_Service.calculateGranulometry(body);

      return { data: granulometry.data, success: true };
    } catch (error) {
      this.logger.error(`error on calculating granulometric composition data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveStep3Data(body: any, userId: string) {
    try {
      const success = await this.granulometryComposition_Service.saveStep4Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 3 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep5SpecificMasses(body: any) {
    try {
      const data = await this.initialBinder_Service.getStep5SpecificMasses(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 5 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveStep4Data(body: any, userId: string) {
    try {
      const success = await this.granulometryComposition_Service.saveStep4Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 5 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateStep5Data(body: any) {
    try {
      const data = await this.initialBinder_Service.calculateStep5Data(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on calculate step 5 data superpave > [error]: ${error}`);
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
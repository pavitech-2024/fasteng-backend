import { Injectable, Logger } from "@nestjs/common";
import { SandSwellingRepository } from "../repository";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { Calc_SandSwelling_Dto, Calc_SandSwelling_Out } from "../dto/calc.sand-swelling.dto";
import { CalculateUnitMassDto } from "../dto/calc-unit-mass.dto";
import { Calc_MoistureContent_Dto } from "../dto/calc-moisture-content.dto";


@Injectable()
export class Calc_SandSwelling_Service {
  private logger = new Logger(Calc_SandSwelling_Service.name);

  constructor(
    private readonly sandSwellingRepository: SandSwellingRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async calculateSandSwelling(calc_SandSwellingDto: any): Promise<{ success: boolean; result: Calc_SandSwelling_Out}> {
    try {
      this.logger.log('calculate sand-swelling on calc.cbr.service.ts > [body]');

      const step = calc_SandSwellingDto.step;
      const result: Calc_SandSwelling_Out = {
        unitMasses: [],
        moistureContent: [], 
        swellings: [], 
        curve: {}, 
        retaR: {}, 
        retaS: {}, 
        retaT: {}, 
        retaU: {}, 
        averageCoefficient: 0,
        criticalHumidity: 0,
      };

      switch (step) {
        case 1:
          const tableData: any = calc_SandSwellingDto.unitMassDeterminationData.tableData;
          const calculateUnitMass = calc_SandSwellingDto.unitMassDeterminationData;
          const unitMasses = [];

          tableData.forEach(item => {
            if(item.containerWeightSample !== null) {
              const unitMass = (item.containerWeightSample - calculateUnitMass.containerWeight) / calculateUnitMass.containerVolume;
              unitMasses.push(unitMass);
            } 
          });
          
          result.unitMasses = unitMasses;
          break;
        case 2:
          const moistureContentData = calc_SandSwellingDto['moistureContentData'].calculateMoistureContent.tableData;
          const moistureContents = [];

          moistureContentData.forEach(data => {
            if (data.dryGrossWeight !== data.capsuleWeight) {
              moistureContents.push(((data.wetGrossWeight - data.dryGrossWeight) / (data.dryGrossWeight - data.capsuleWeight)) * 100);
            } else {
              moistureContents.push(0);
            }
          });

          result.moistureContent = moistureContents;
          break
        default:
          break;
      }

      return {
        success: true,
        result: {
          unitMasses: result.unitMasses,
          moistureContent: result.moistureContent,
          swellings: [],
          curve: undefined,
          retaR: undefined,
          retaS: undefined,
          retaT: undefined,
          retaU: undefined,
          averageCoefficient: 0,
          criticalHumidity: 0
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // async calculateUnitMass(body: any): Promise<{success: boolean; result: any }> {
  //   try {
  //     this.logger.log('calculate unit mass on calc.cbr.service.ts > [body]');

  //     const tableData: any = body.calculateUnitMass.tableData;
  //     const calculateUnitMass = body.calculateUnitMass;
  //     const unitMasses = [];

  //     tableData.forEach(item => {
  //       if(item.containerWeightSample !== null) {
  //         const unitMass = (item.containerWeightSample - Number(calculateUnitMass.containerWeight)) / calculateUnitMass.containerVolume;
  //         unitMasses.push(unitMass);
  //       } 
  //     });

  //     const result = unitMasses;

  //     return {
  //       success: true,
  //       result,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async calculateMoistureContent(body: any): Promise<{success: boolean; result: any }> {
  //   try {
  //     this.logger.log('calculate moisture content on calc.cbr.service.ts > [body]');

  //     const tableData = body.calculateMoistureContent.tableData;

  //     const result = [];

  //     tableData.map((data) => {
  //       if (data.dryGrossWeight !== data.capsuleWeight) {
  //          result.push(((data.wetGrossWeight - data.dryGrossWeight) / (data.dryGrossWeight - data.capsuleWeight)) * 100);
  //       } else {
  //         result.push(0);
  //       }
  //     });

  //     return {
  //       success: true,
  //       result,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
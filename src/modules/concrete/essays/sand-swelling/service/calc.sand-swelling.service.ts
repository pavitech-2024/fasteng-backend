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

      const step = calc_SandSwellingDto.step ? calc_SandSwellingDto.step : 3;
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
          const moistureContentData = calc_SandSwellingDto.calculateMoistureContent.tableData;
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
        case 3:
          const tableData2: any = calc_SandSwellingDto.unitMassDeterminationData.tableData;
          const calculateUnitMass2 = calc_SandSwellingDto.unitMassDeterminationData;
          const unitMasses2 = [];

          tableData2.forEach(item => {
            if(item.containerWeightSample !== null) {
              const unitMass = (item.containerWeightSample - calculateUnitMass2.containerWeight) / calculateUnitMass2.containerVolume;
              unitMasses2.push(unitMass);
            } 
          });
          
          result.unitMasses = unitMasses2;

          const moistureContentData2 = calc_SandSwellingDto.humidityFoundData.tableData;
          const moistureContents2 = [];

          moistureContentData2.forEach(data => {
            if (data.dryGrossWeight !== data.capsuleWeight) {
              moistureContents2.push(((data.wetGrossWeight - data.dryGrossWeight) / (data.dryGrossWeight - data.capsuleWeight)) * 100);
            } else {
              moistureContents2.push(0);
            }
          });

          result.moistureContent = moistureContents2;
        default:
          break;
      }

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }
}
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
          result.unitMasses = calculateUnitMasses(
            calc_SandSwellingDto.unitMassDeterminationData.tableData, 
            calc_SandSwellingDto.unitMassDeterminationData
          );
          break;
        case 2:
          result.moistureContent = calculateMoistureContents(calc_SandSwellingDto.calculateMoistureContent.tableData);
          break
        case 3:
          const findedUnitMasses = calc_SandSwellingDto.unitMassDeterminationData.tableData.map((item) => item.unitMass);
          const findedContents = calc_SandSwellingDto.humidityFoundData.tableData.map((item) => item.moistureContent);
          const dryUnitMass = calc_SandSwellingDto.humidityFoundData.dryGrossWeight.map((item) => item.dryGrossWeight);
          let swellings = [];

          for (let i = 0; i < findedUnitMasses.length; i++) {
            if (findedUnitMasses[i] !== 0) {
              const swelling = (dryUnitMass[i] / findedUnitMasses[i]) * ((100 + findedContents[i]) / 100);
              swellings.push(swelling);
            } else {
              swellings.push(null);
            }
          }

          result.swellings = swellings;

          result.unitMasses = calculateUnitMasses(
            calc_SandSwellingDto.unitMassDeterminationData.tableData, 
            calc_SandSwellingDto.unitMassDeterminationData
          );

          result.moistureContent = calculateMoistureContents(
            calc_SandSwellingDto.humidityFoundData.tableData
          );


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

function calculateUnitMasses(tableData: any, calculationData: any): number[] {
  const unitMasses: number[] = [];
  tableData.forEach(item => {
    if (item.containerWeightSample !== null) {
      const unitMass = (item.containerWeightSample - calculationData.containerWeight) / calculationData.containerVolume;
      unitMasses.push(unitMass);
    }
  });
  return unitMasses;
}

function calculateMoistureContents(moistureContentData: any): number[] {
  const moistureContents: number[] = [];
  moistureContentData.forEach(data => {
    if (data.dryGrossWeight !== data.capsuleWeight) {
      moistureContents.push(((data.wetGrossWeight - data.dryGrossWeight) / (data.dryGrossWeight - data.capsuleWeight)) * 100);
    } else {
      moistureContents.push(0);
    }
  });
  return moistureContents;
}
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

  async calculateSandSwelling(body: Calc_SandSwelling_Dto): Promise<{ success: boolean; result: Calc_SandSwelling_Out}> {
    try {
      this.logger.log('calculate sand-swelling on calc.cbr.service.ts > [body]');

      return {
        success: true,
        result: {},
      };
    } catch (error) {
      throw error;
    }
  }

  async calculateUnitMass(body: any): Promise<{success: boolean; result: any }> {
    try {
      this.logger.log('calculate unit mass on calc.cbr.service.ts > [body]');

      const tableData: any = body.calculateUnitMass.tableData;
      const calculateUnitMass = body.calculateUnitMass;
      const unitMasses = [];

      tableData.forEach(item => {
        if(item.containerWeightSample !== null) {
          const unitMass = (item.containerWeightSample - Number(calculateUnitMass.containerWeight)) / calculateUnitMass.containerVolume;
          unitMasses.push(unitMass);
        } 
      });

      const result = unitMasses;

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }

  async calculateMoistureContent(body: any): Promise<{success: boolean; result: any }> {
    try {
      this.logger.log('calculate moisture content on calc.cbr.service.ts > [body]');

      const tableData = body.calculateMoistureContent.tableData;

      const result = [];

      tableData.map((data) => {
        if (data.dryGrossWeight !== data.capsuleWeight) {
           result.push((data.wetGrossWeight - data.dryGrossWeight) / (data.dryGrossWeight - data.capsuleWeight)) * 100;
        } else {
          result.push(0);
        }
      });

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }
}
import { Injectable, Logger } from "@nestjs/common";
import { Calc_UnitMassDto } from "../dto/calc.sand-increase.dto";
import { UnitMassTableData } from "../schema";

@Injectable()
export class Calc_UnitMass_Service {
  private logger = new Logger(Calc_UnitMass_Service.name);
  constructor() {}

  async calculateUnitMass(body: Calc_UnitMassDto) {
    try {
      this.logger.log('calculate sabd-increase unit mass on calc.unit-mass.service.ts > [body]');

      const { containerVolume, containerWeight, tableData } = body;

      const result = calculateUnitMasses(tableData, containerVolume, containerWeight);

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }
}

function calculateUnitMasses(tableData: UnitMassTableData[], containerVolume: string, containerWeight: string): number[] {
  const unitMasses: number[] = [];
  tableData.forEach(item => {
    if (item.containerWeightSample !== null) {
      const unitMass = (item.containerWeightSample - Number(containerWeight)) / Number(containerVolume);
      unitMasses.push(unitMass);
    }
  });
  return unitMasses;
}
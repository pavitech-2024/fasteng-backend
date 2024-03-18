import { Injectable, Logger } from "@nestjs/common";
import { Calc_MoistureContentDto } from "../dto/calc.sand-increase.dto";

@Injectable()
export class Calc_MoistureContent_Service {
  private logger = new Logger(Calc_MoistureContent_Service.name);
  constructor() {}

  async calculateMoistureContent(body: Calc_MoistureContentDto) {
    try {
      this.logger.log('calculate sand-increase moisture content on calc.moisture-content.service.ts > [body]');

      const { tableData } = body;

      const result = calculateMoistureContents(tableData);

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }
}

function calculateMoistureContents(tableData: any): number[] {
  const moistureContents: number[] = [];
  tableData.forEach(data => {
    if (data.dryGrossWeight !== data.capsuleWeight) {
      moistureContents.push(((data.wetGrossWeight - data.dryGrossWeight) / (data.dryGrossWeight - data.capsuleWeight)) * 100);
    } else {
      moistureContents.push(0);
    }
  });
  return moistureContents;
}

// function calculateUnitMasses(tableData: any, containerVolume: any, containerWeight: any): number[] {
//   const unitMasses: number[] = [];
//   tableData.forEach(item => {
//     if (item.containerWeightSample !== null) {
//       const unitMass = (item.containerWeightSample - containerWeight) / containerVolume;
//       unitMasses.push(unitMass);
//     }
//   });
//   return unitMasses;
// }
import { Injectable, Logger } from '@nestjs/common';
import { Result_UnitMass_Dto } from '../dto/unitMass-result.dto';

@Injectable()
export class Result_UnitMass_Service {
  async calculateUnitMass({ step2Data }: Result_UnitMass_Dto) {
    try {
      const result = (step2Data.containerWeight + step2Data.sampleContainerWeight) / step2Data.containerVolume;

      return {
        success: true,
        result: {
          result: result,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

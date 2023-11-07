import { Injectable } from '@nestjs/common';
import { UnitMass_Step2_Dto } from '../dto/unitMass-step2.dto';

@Injectable()
export class step2Data_Service {
  async verifyStep2DataUnitMass({ containerVolume, containerWeight, sampleContainerWeight }: UnitMass_Step2_Dto) {
    try {
      if (containerVolume && containerWeight && containerVolume + containerWeight >= sampleContainerWeight) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}

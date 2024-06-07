import { Injectable, Logger } from '@nestjs/common';
import { SuperpaveRepository } from '../repository';
import { GeneralData_Superpave_Service } from './general-data.superpave.service';

@Injectable()
export class FirstCompression_Superpave_Service {
  private logger = new Logger(FirstCompression_Superpave_Service.name);

  constructor(
    private readonly superpave_repository: SuperpaveRepository,
    private readonly generalData_Service: GeneralData_Superpave_Service,
  ) {}

  async calculateGmm(body: any): Promise<any> {
    try {
      this.logger.log({ body }, 'start calculate step 5 gmm data > [service]');

      const { riceTest } = body;

      let result = {
        lower: {
          gmm: 0,
        },
        average: {
          gmm: 0,
        },
        higher: {
          gmm: 0,
        },
      };

      for (let i = 0; i < riceTest.length; i++) {
        if (riceTest[i].gmm !== 0) {
          result[riceTest[i].curve].gmm = riceTest[i].gmm;
        } else {
          const gmm = await this.claculateRiceTest(riceTest[i]);
          result[riceTest[i].curve].gmm = gmm;
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async claculateRiceTest(body: any) {
    try {
      this.logger.log({ body }, 'start calculate rice test > [service]');

      const { 
        drySampleMass, 
        waterSampleContainerMass,         
        waterSampleMass, 
        temperatureOfWater 
      } = body;

      const riceTest =
        (drySampleMass / (drySampleMass + waterSampleMass - waterSampleContainerMass)) * temperatureOfWater;

      return riceTest;
    } catch (error) {
      throw error;
    }
  }
}

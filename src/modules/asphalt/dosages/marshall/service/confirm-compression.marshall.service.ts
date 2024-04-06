import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { AsphaltGranulometryRepository } from 'modules/asphalt/essays/granulometry/repository';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';

@Injectable()
export class ConfirmCompression_Marshall_Service {
  private logger = new Logger(ConfirmCompression_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async confirmSpecificGravity(body: any) {
    try {
      this.logger.log('confirming specific gravity on confirm-compression.marshall.service.ts > [body]', { body });
      

      const { 
        method, 
        listOfSpecificGravities, 
        percentsOfDosage, 
        confirmedPercentsOfDosage, 
        optimumContent,
        gmm,
        valuesOfSpecificGravity
      } = body;

      let confirmedSpecificGravity;
      let GMM;

      let formattedPercentsOfDosage = [];

      const ids1 = new Set();

      Object.keys(percentsOfDosage[0]).forEach(key => {
        const id = key.split('_')[1];
        ids1.add(id);
        const value = percentsOfDosage[0][key];
        const index = Array.from(ids1).indexOf(id);
        formattedPercentsOfDosage[index] = value;
      });

      if (method === 'DMT') {
        const denominador = formattedPercentsOfDosage.reduce(
          (acc, percent, i) => (acc += confirmedPercentsOfDosage[i] / listOfSpecificGravities[i]),
          0,
        );
        const DMT = 100 / (denominador + optimumContent / 1.03);
        confirmedSpecificGravity = {
          result: DMT,
          type: 'DMT',
        };
        return confirmedSpecificGravity;
      } else if (method === 'GMM') {
        if (gmm) GMM = gmm;
        else GMM = valuesOfSpecificGravity.massOfDrySample / (valuesOfSpecificGravity.massOfDrySample - valuesOfSpecificGravity.massOfContainerWaterSample + valuesOfSpecificGravity.massOfContainerWater);
        confirmedSpecificGravity = {
            result: GMM,
            type: "GMM"
        }
        return confirmedSpecificGravity;
      }
    } catch (error) {
      throw error;
    }
  }
}

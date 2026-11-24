
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';

@Injectable()
export class ConfirmCompression_Marshall_Service {
  private readonly logger = new Logger(ConfirmCompression_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async confirmSpecificGravity(body: any) {
    this.logger.log(
      'Confirming specific gravity on confirm-compression.marshall.service.ts',
      { body },
    );

    const {
      method,
      listOfSpecificGravities,
      confirmedPercentsOfDosage,
      optimumContent,
      gmm,
      valuesOfSpecificGravity,
    } = body;

    if (method === 'DMT') {
      const denominator = confirmedPercentsOfDosage.reduce(
        (acc, percent, index) =>
          acc + percent / listOfSpecificGravities[index],
        0,
      );

      const DMT = 100 / (denominator + optimumContent / 1.03);

      return {
        result: DMT,
        type: 'DMT',
      };
    }

    if (method === 'GMM') {
      const GMM =
        gmm ??
        valuesOfSpecificGravity.massOfDrySample /
          (valuesOfSpecificGravity.massOfDrySample -
            valuesOfSpecificGravity.massOfContainerWaterSample +
            valuesOfSpecificGravity.massOfContainerWater);

      return {
        result: GMM,
        type: 'GMM',
      };
    }

    return undefined;
  }

  async saveStep8Data(body: any, userId: string) {
    this.logger.log(
      'Saving Marshall confirmation compression step 8',
      { body },
    );

    const { name, ...confirmationCompressionWithoutName } =
      body.confirmationCompressionData;

    const marshallExists = await this.marshallRepository.findOne(
      name,
      userId,
    );

    if (!marshallExists) {
      throw new Error('Marshall not found');
    }

    marshallExists.confirmationCompressionData =
      confirmationCompressionWithoutName;

    await marshallExists.save();

    if (marshallExists.step < 8) {
      await this.marshallRepository.saveStep(marshallExists, 8);
    }

    return true;
  }
}

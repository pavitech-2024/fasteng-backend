import { Injectable, Logger } from '@nestjs/common';
import { SuperpaveRepository } from '../repository';
import { InjectModel } from '@nestjs/mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';

@Injectable()
export class FirstCompression_Superpave_Service {
  private logger = new Logger(FirstCompression_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository,
  ) {}

  async calculateGmm_RiceTest(body: any): Promise<any> {
    try {
      this.logger.log({ body }, 'start calculate step 5 gmm data > [service]');

      const { riceTest } = body;
      const { drySampleMass, waterSampleContainerMass, waterSampleMass, temperatureOfWater } = riceTest;

      const riceTestValue =
        (drySampleMass / (drySampleMass + waterSampleMass - waterSampleContainerMass)) * temperatureOfWater;

      return riceTestValue;
    } catch (error) {
      throw error;
    }
  }

  async saveFirstCompressionData(body: any, userId: string) {
    try {
      this.logger.log('save superpave first compression step on first-compression.superpave.service.ts > [body]', {
        body,
      });

      const { name } = body.firstCompressionData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...firstCompressionWithoutName } = body.firstCompressionData;

      const superpaveWithFirstCompression = {
        ...superpaveExists._doc,
        firstCompressionData: firstCompressionWithoutName,
      };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithFirstCompression);

      if (superpaveExists._doc.generalData.step < 6) {
        await this.superpaveRepository.saveStep(superpaveExists, 6);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { SuperpaveRepository } from '../repository/index';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';

@Injectable()
export class GeneralData_Superpave_Service {
  private logger = new Logger(GeneralData_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository,
  ) {}

  async verifyInitSuperpave(superpave: any, userId: string) {
    try {
      this.logger.log('verify init Superpave on general-data.superpave.service.ts > [body]');

      const { name } = superpave;
      console.log(name);
      const SuperpaveExists = await this.superpaveRepository.findOne(name, userId);

      if (SuperpaveExists) throw new AlreadyExists('name');

      const createdPartialSuperpave = await this.superpaveRepository.createPartialSuperpave(superpave, userId);

      await this.superpaveRepository.saveStep(createdPartialSuperpave._doc, 1);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async saveSuperpaveDosage(body: any, userId: string) {
    try {
      this.logger.log('save superpave dosage on general-data.superpave.service.ts > [body]', {
        body,
      });

      const { name } = body.generalData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { isConsult, ...superpaveDosageWithoutIsConsult } = body;

      const completedSuperpaveDosage = {
        ...superpaveExists._doc,
        saveSuperpaveDosage: superpaveDosageWithoutIsConsult,
      };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, completedSuperpaveDosage);

      if (superpaveExists._doc.generalData.step < 9) {
        await this.superpaveRepository.saveStep(superpaveExists, 9);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteSuperpaveDosage(id: string) {
    try {
      this.logger.log('delete superpave dosage on general-data.superpave.service.ts > [body]', {
        id,
      });

      const result = await this.superpaveModel.findByIdAndDelete(id);

      if (!result) {
        throw new Error('Documento não encontrado para deletar.');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

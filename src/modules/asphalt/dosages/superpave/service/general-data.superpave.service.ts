import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SuperpaveRepository } from '../repository/index';
import { SuperpaveInitDto } from '../dto/superpave-init.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { Superpave, SuperpaveDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';

@Injectable()
export class GeneralData_Superpave_Service {
  private logger = new Logger(GeneralData_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository
  ) {}

  async verifyInitSuperpave(superpave: any, userId: string) {
    try {
      this.logger.log('verify init Superpave on general-data.superpave.service.ts > [body]');

      const { name } = superpave;

      const SuperpaveExists = await this.superpaveRepository.findOne(name, userId);

      if (SuperpaveExists) throw new AlreadyExists('name');

      const createdPartialSuperpave = await this.superpaveRepository.createPartialSuperpave(superpave, userId);

      await this.superpaveRepository.saveStep(createdPartialSuperpave._doc, 1);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async getDosageById(dosageId: string) {
    try {
      this.logger.log(
        'get dosage by id on general-data.superpave.service.ts > [body]',
        {
          dosageId,
        },
      );
      const dosage = await this.superpaveRepository.findById(dosageId);

      if (!dosage) {
        throw new NotFoundException(`Dosage whith id ${dosageId} not found`);
      }

      return dosage;
    } catch (error) {
      throw error;
    }
  }

  async deleteSuperpaveDosage(id: string) {
    try {
      this.logger.log(
        'delete superpave dosage on general-data.superpave.service.ts > [body]',
        {
          id,
        },
      );

      const result = await this.superpaveModel.findByIdAndDelete(id);

      if (!result) {
        throw new Error('Documento não encontrado para deletar.')
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

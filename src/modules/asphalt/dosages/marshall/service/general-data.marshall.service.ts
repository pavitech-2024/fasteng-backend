
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MarshallRepository } from '../repository/index';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Marshall, MarshallDocument } from '../schemas';
import { MarshallInitDto } from '../dto/marshall-init.dto';

@Injectable()
export class GeneralData_Marshall_Service {
  private readonly logger = new Logger(GeneralData_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async verifyInitMarshall(marshall: MarshallInitDto, userId: string) {
    this.logger.log(
      'Verifying Marshall initialization on general-data.marshall.service.ts',
    );

    const {
      generalData: { name },
      _id,
    } = marshall;

    const marshallExists = await this.marshallRepository.findOne(
      name,
      userId,
    );

    if (marshallExists && !_id) {
      throw new AlreadyExists('name');
    }

    const createdPartialMarshall =
      await this.marshallRepository.createPartialMarshall(
        marshall,
        userId,
      );

    await this.marshallRepository.saveStep(createdPartialMarshall, 1);

    return {
      success: true,
      dosage: createdPartialMarshall,
    };
  }

  async getDosageById(dosageId: string) {
    this.logger.log(
      'Getting dosage by ID on general-data.marshall.service.ts',
      { dosageId },
    );

    const dosage = await this.marshallRepository.findById(dosageId);

    if (!dosage) {
      throw new NotFoundException(
        `Dosage with id ${dosageId} not found`,
      );
    }

    return dosage;
  }

  async saveMarshallDosage(body: any, userId: string) {
    this.logger.log(
      'Saving Marshall dosage on general-data.marshall.service.ts',
      { body },
    );

    const { name } = body.generalData;

    const marshallExists = await this.marshallRepository.findOne(
      name,
      userId,
    );

    if (!marshallExists) {
      throw new NotFoundException('Marshall not found');
    }

    const { isConsult, ...marshallDosageWithoutIsConsult } = body;

    marshallExists.set(marshallDosageWithoutIsConsult);

    await marshallExists.save();

    if (marshallExists.step < 9) {
      await this.marshallRepository.saveStep(marshallExists, 9);
    }

    return true;
  }

  async deleteMarshallDosage(id: string) {
    this.logger.log(
      'Deleting Marshall dosage on general-data.marshall.service.ts',
      { id },
    );

    const result = await this.marshallModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(
        'Documento não encontrado para deletar.',
      );
    }

    return true;
  }
}

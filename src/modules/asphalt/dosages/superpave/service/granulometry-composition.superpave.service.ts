import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { AllSieves } from 'utils/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';
import { SuperpaveRepository } from '../repository';

@Injectable()
export class GranulometryComposition_Superpave_Service {
  private logger = new Logger(GranulometryComposition_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
    private readonly superpaveRepository: SuperpaveRepository,
  ) {}

  /* async getGranulometryData(aggregates: { _id: string; name: string }[]) {
  } */
}

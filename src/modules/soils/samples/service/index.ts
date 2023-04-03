import { Injectable } from '@nestjs/common';
import { SamplesRepository } from '../repository';

@Injectable()
export class SamplesService {
  constructor(private readonly samplesRepository: SamplesRepository) {}
}

import { Injectable } from '@nestjs/common';
import { MaterialsRepository } from '../repository';

@Injectable()
export class MaterialsService {
  constructor(private readonly materialsRepository: MaterialsRepository) {}
}

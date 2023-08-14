import { Injectable } from '@nestjs/common';
import { GeneralData_SandSwelling_Service } from './general-data.sand-swelling.service';
import { SandSwellingRepository } from '../repository';
import { Calc_SandSwelling_Service } from './calc.sand-swelling.service';

@Injectable()
export class SandSwellingService {
  constructor(
    private readonly generalData_Service: GeneralData_SandSwelling_Service,
    private readonly calc_Service: Calc_SandSwelling_Service,
    private readonly sandSwellingRepository: SandSwellingRepository
  ){}
}

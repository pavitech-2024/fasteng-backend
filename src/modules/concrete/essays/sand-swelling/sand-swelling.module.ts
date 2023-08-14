import { Module } from '@nestjs/common';
import { GeneralData_SandSwelling_Service } from './service/general-data.sand-swelling.service';
import { Calc_SandSwelling_Service } from './service/calc.sand-swelling.service';
import { SandSwellingRepository } from './repository';
import { SandSwellingService } from './service';
import { SandSwellingController } from './controller';

const services = [SandSwellingService, GeneralData_SandSwelling_Service, Calc_SandSwelling_Service];

@Module({
  imports: [],
  controllers: [SandSwellingController],
  providers: [...services, SandSwellingRepository],
  exports: [SandSwellingService, SandSwellingRepository]
})
export class SandSwellingModule {}

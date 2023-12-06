import { Module } from '@nestjs/common';
import { SpecifyMassController } from './controller';
import { SpecifyMassService } from './service/index';
import { SpecifyMassRepository } from './repository';
import { GeneralData_SPECIFYMASS_Service } from './service/general-data.specifyMass.servive';
import { Calc_SPECIFYMASS_Service } from './service/calc.specifyMass.service';

const services = [SpecifyMassService, GeneralData_SPECIFYMASS_Service, Calc_SPECIFYMASS_Service];

@Module({
  imports: [],
  controllers: [SpecifyMassController],
  providers: [...services, SpecifyMassRepository],
  exports: [SpecifyMassService, SpecifyMassRepository],
})
export class SpecifyMassModule {}

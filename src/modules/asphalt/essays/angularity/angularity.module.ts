import { Module } from '@nestjs/common';
import { AngularityController } from './controller';
import { AngularityService } from './service/index';
import { AngularityRepository } from './repository';
import { Calc_ANGULARITY_Service } from './service/calc.angularity.service';
import { GeneralData_ANGULARITY_Service } from './service/general-data.angularity.service';

const services = [AngularityService, GeneralData_ANGULARITY_Service, Calc_ANGULARITY_Service];

@Module({
  imports: [],
  controllers: [AngularityController],
  providers: [...services, AngularityRepository],
  exports: [AngularityService, AngularityRepository],
})
export class AngularityModule {}

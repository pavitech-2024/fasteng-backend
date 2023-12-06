import { Module } from '@nestjs/common';
import { DuctilityController } from './controller';
import { DuctilityService } from './service/index';
import { DuctilityRepository } from './repository';
import { Calc_DUCTILITY_Service } from './service/calc.ductility.service';
import { GeneralData_DUCTILITY_Service } from './service/general-data.ductility.service';

const services = [DuctilityService, GeneralData_DUCTILITY_Service, Calc_DUCTILITY_Service];

@Module({
  imports: [],
  controllers: [DuctilityController],
  providers: [...services, DuctilityRepository],
  exports: [DuctilityService, DuctilityRepository],
})
export class DuctilityModule {}

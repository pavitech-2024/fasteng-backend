import { Module } from '@nestjs/common';
import { RtController } from './controller';
import { RtRepository } from './repository';
import { Calc_Rt_Service } from './service/calc.rt.service';
import { GeneralData_Rt_Service } from './service/general-data.rt.service';
import { RtService } from './service/rt.service';

const services = [RtService, GeneralData_Rt_Service, Calc_Rt_Service];

@Module({
  imports: [],
  controllers: [RtController],
  providers: [...services, RtRepository],
  exports: [RtService, RtRepository],
})
export class RtModule {}

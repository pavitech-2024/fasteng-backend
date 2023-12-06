import { Module } from '@nestjs/common';
import { RtcdController } from './controller';
import { RtcdRepository } from './repository';
import { Calc_Rtcd_Service } from './service/calc.rtcd.service';
import { GeneralData_Rtcd_Service } from './service/general-data.rtcd.service';
import { RtcdService } from './service/rtcd.service';

const services = [RtcdService, GeneralData_Rtcd_Service, Calc_Rtcd_Service];

@Module({
  imports: [],
  controllers: [RtcdController],
  providers: [...services, RtcdRepository],
  exports: [RtcdService, RtcdRepository],
})
export class RtcdModule {}

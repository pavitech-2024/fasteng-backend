import { Module } from '@nestjs/common';
import { FwdController } from './controller';
import { FwdRepository } from './repository';
import { FwdService } from './services';
import { GeneralData_Fwd_Service } from './services/general-data.fwd.service';
import { Calc_Fwd_Service } from './services/calc.fwd.service';

const services = [FwdService, GeneralData_Fwd_Service, Calc_Fwd_Service];

@Module({
  imports: [],
  controllers: [FwdController],
  providers: [...services, FwdRepository],
  exports: [FwdService, FwdRepository],
})
export class FwdModule {}

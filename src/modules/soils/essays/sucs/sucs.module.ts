import { Module } from '@nestjs/common';
import { SucsController } from './controller';
import { SucsService } from './service';
import { SucsRepository } from './repository';
import { GeneralData_SUCS_Service } from './service/general-data.sucs.service';
import { Calc_SUCS_Service } from './service/calc.sucs.service';

const services = [SucsService, GeneralData_SUCS_Service, Calc_SUCS_Service];

@Module({
  imports: [],
  controllers: [SucsController],
  providers: [...services, SucsRepository],
  exports: [SucsService, SucsRepository],
})
export class SucsModule {}

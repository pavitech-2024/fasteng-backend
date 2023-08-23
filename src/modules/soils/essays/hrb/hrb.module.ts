import { Module } from '@nestjs/common';
import { HrbService } from './service';
import { GeneralData_HRB_Service } from './service/general-data.hrb.service';
import { HrbController } from './controller';
import { HrbRepository } from './repository';
import { Calc_HRB_Service } from './service/calc.hrb.service';

const services = [HrbService, GeneralData_HRB_Service, Calc_HRB_Service];

@Module({
  imports: [],
  controllers: [HrbController],
  providers: [...services, HrbRepository],
  exports: [HrbService, HrbRepository],
})
export class HrbModule {}

import { Module } from '@nestjs/common';
import { CbrController } from './controller';
import { CbrService } from './service';
import { CbrRepository } from './repository';
import { GeneralData_CBR_Service } from './service/general-data.cbr.service';
import { Calc_CBR_Service } from './service/calc.cbr.service';

const services = [CbrService, GeneralData_CBR_Service, Calc_CBR_Service];

@Module({
  imports: [],
  controllers: [CbrController],
  providers: [...services, CbrRepository],
  exports: [CbrService, CbrRepository],
})
export class CbrModule {}

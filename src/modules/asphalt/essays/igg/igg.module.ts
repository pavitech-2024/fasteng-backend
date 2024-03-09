import { Module } from '@nestjs/common';
import { IggController } from './controller';
import { IggRepository } from './repository';
import { Calc_Igg_Service } from './service/calc.igg.service';
import { GeneralData_Igg_Service } from './service/general-data.igg.service';
import { IggService } from './service/igg.service';

const services = [IggService, GeneralData_Igg_Service, Calc_Igg_Service];

@Module({
  imports: [],
  controllers: [IggController],
  providers: [...services, IggRepository],
  exports: [IggService, IggRepository],
})
export class IggModule {}

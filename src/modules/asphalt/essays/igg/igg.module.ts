import { Module } from '@nestjs/common';
import { IggController } from './controller';
import { IggRepository } from './repository';
import { IggService } from './services';
import { GeneralData_Igg_Service } from './services/general-data.igg.service';
import { Calc_Igg_Service } from './services/calc.igg.service';

const services = [IggService, GeneralData_Igg_Service, Calc_Igg_Service];

@Module({
  imports: [],
  controllers: [IggController],
  providers: [...services, IggRepository],
  exports: [IggService, IggRepository],
})
export class IggModule {}

import { Module } from '@nestjs/common';
import { FlashPointController } from './controller';
import { FlashPointService } from './service/index';
import { FlashPointRepository } from './repository';
import { Calc_FLASHPOINT_Service } from './service/calc.flashpoint.service';
import { GeneralData_FLASHPOINT_Service } from './service/general-data.flashPoint.service';

const services = [FlashPointService, GeneralData_FLASHPOINT_Service, Calc_FLASHPOINT_Service];

@Module({
  imports: [],
  controllers: [FlashPointController],
  providers: [...services, FlashPointRepository],
  exports: [FlashPointService, FlashPointRepository],
})
export class FlashPointModule {}

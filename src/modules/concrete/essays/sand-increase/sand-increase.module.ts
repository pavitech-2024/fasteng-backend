import { Module } from '@nestjs/common';
import { GeneralData_SandIncrease_Service } from './service/general-data.sand-increase.service';
import { Calc_SandIncrease_Service } from './service/calc.sand-increase.service';
import { SandIncreaseRepository } from './repository';
import { SandIncreaseService } from './service';
import { SandIncreaseController } from './controller';

const services = [SandIncreaseService, GeneralData_SandIncrease_Service, Calc_SandIncrease_Service];

@Module({
  imports: [],
  controllers: [SandIncreaseController],
  providers: [...services, SandIncreaseRepository],
  exports: [SandIncreaseService, SandIncreaseRepository]
})
export class SandIncreaseModule {}

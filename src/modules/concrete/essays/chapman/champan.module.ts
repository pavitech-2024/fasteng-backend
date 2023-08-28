import { Module } from '@nestjs/common';
import { ChapmanController } from './controller';
import { ChapmanService } from './service/champan.service';
import { ChapmanRepository } from './repository';
import { GeneralData_Chapman_Service } from './service/general-data.chapman.service';
import { Calc_CHAPMAN_Service } from './service/calc.chapman.service';

const services = [ChapmanService, GeneralData_Chapman_Service, Calc_CHAPMAN_Service];

@Module({
  imports: [],
  controllers: [ChapmanController],
  providers: [...services, ChapmanRepository],
  exports: [ChapmanService, ChapmanRepository],
})
export class ChapmanModule {}

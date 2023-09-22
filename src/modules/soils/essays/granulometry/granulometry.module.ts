import { Module } from '@nestjs/common';
import { GranulometryController } from './controller';
import { GranulometryService } from './service';
import { GranulometryRepository } from './repository';
import { GeneralData_GRANULOMETRY_Service } from './service/general-data.granulometry.service';
import { Calc_GRANULOMETRY_Service } from './service/calc.granulometry.service';

const services = [GranulometryService, GeneralData_GRANULOMETRY_Service, Calc_GRANULOMETRY_Service];

@Module({
  imports: [],
  controllers: [GranulometryController],
  providers: [...services, GranulometryRepository],
  exports: [GranulometryService, GranulometryRepository],
})
export class GranulometryModule {}
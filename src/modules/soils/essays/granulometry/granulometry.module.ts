import { Module } from '@nestjs/common';
import { GranulometryController } from './controller';
import { SoilsGranulometryService } from './service';
import { SoilsGranulometryRepository } from './repository';
import { GeneralData_SoilsGranulometry_Service } from './service/general-data.granulometry.service';
import { Calc_SoilsGranulometry_Service } from './service/calc.granulometry.service';

const services = [SoilsGranulometryService, GeneralData_SoilsGranulometry_Service, Calc_SoilsGranulometry_Service];

@Module({
  imports: [],
  controllers: [GranulometryController],
  providers: [...services, SoilsGranulometryRepository],
  exports: [SoilsGranulometryService, SoilsGranulometryRepository],
})
export class SoilsGranulometryModule {}
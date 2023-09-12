import { Module } from '@nestjs/common';
import { ConcreteGranulometryController } from './controller';
import { ConcreteGranulometryService } from './service';
import { ConcreteGranulometryRepository } from './repository';
import { GeneralData_ConcreteGranulometry_Service } from './service/general-data.granulometry.service';
import { Calc_ConcreteGranulometry_Service } from './service/calc.granulometry.service';

const services = [ConcreteGranulometryService, GeneralData_ConcreteGranulometry_Service, Calc_ConcreteGranulometry_Service];

@Module({
  imports: [],
  controllers: [ConcreteGranulometryController],
  providers: [...services, ConcreteGranulometryRepository],
  exports: [ConcreteGranulometryService, ConcreteGranulometryRepository],
})
export class ConcreteGranulometryModule {}
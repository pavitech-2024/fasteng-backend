import { Module } from '@nestjs/common';
import { CoarseAggregateController } from './controller';
import { CoarseAggregateService } from './service';
import { GeneralData_CoarseAggregate_Service } from './service/general-data.coarseAggregate.service';
import { CoarseAggregateSpecificMassRepository } from './repository';
// import { CoarseAggregateService } from './service';
// import { CoarseAggregateRepository } from './repository';
// import { GeneralData_CoarseAggregate_Service } from './service/general-data.CoarseAggregate.service';
// import { Calc_CoarseAggregate_Service } from './service/calc.CoarseAggregate.service';

const services = [CoarseAggregateService, GeneralData_CoarseAggregate_Service];

@Module({
  imports: [],
  controllers: [CoarseAggregateController],
  providers: [...services, CoarseAggregateSpecificMassRepository],
  exports: [CoarseAggregateService, CoarseAggregateSpecificMassRepository],
})
export class CoarseAggregateModule {}

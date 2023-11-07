import { Module } from '@nestjs/common';
import { CoarseAggregateController } from './controller';
// import { CoarseAggregateService } from './service';
// import { CoarseAggregateRepository } from './repository';
// import { GeneralData_CoarseAggregate_Service } from './service/general-data.CoarseAggregate.service';
// import { Calc_CoarseAggregate_Service } from './service/calc.CoarseAggregate.service';

// const services = [CoarseAggregateService, GeneralData_CoarseAggregate_Service, Calc_CoarseAggr];

@Module({
  imports: [],
  controllers: [CoarseAggregateController],
  // providers: [...services, CoarseAggregateRepository],
  // exports: [CoarseAggregateService, CoarseAggregateRepository],
})
export class CoarseAggregateModule {}

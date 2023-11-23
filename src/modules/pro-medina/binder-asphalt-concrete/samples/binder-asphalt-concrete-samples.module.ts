import { Module } from '@nestjs/common';
import { BinderAsphaltConcrete_SamplesRepository } from './repository';
import { BinderAsphaltConcreteSamplesController } from './controller';
import { BinderAsphaltConcreteSamplesService } from './service/binder-asphalt-concrete-samples.service';

@Module({
  imports: [],
  controllers: [BinderAsphaltConcreteSamplesController],
  providers: [BinderAsphaltConcreteSamplesService, BinderAsphaltConcrete_SamplesRepository],
  exports: [BinderAsphaltConcreteSamplesService, BinderAsphaltConcrete_SamplesRepository],
})
export class BinderAsphaltConcreteSamplesModule {}

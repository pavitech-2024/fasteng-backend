import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { BinderAsphaltConcreteSamplesModule } from './samples/binder-asphalt-concrete-samples.module';
import { BinderAsphaltConcrete_Sample, BinderAsphaltConcrete_SampleSchema } from './samples/schemas';

const Models: ModelDefinition[] = [
  { name: BinderAsphaltConcrete_Sample.name, schema: BinderAsphaltConcrete_SampleSchema },
];

const Modules = [BinderAsphaltConcreteSamplesModule];

@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.PROMEDINA), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class BinderAsphaltConcreteModule {}

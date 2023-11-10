import { Global, Module } from '@nestjs/common';
import { GranularLayersSamplesModule } from './granular-layers/samples/granular-layers-samples.module';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { GranularLayers_Sample, GranularLayers_SampleSchema } from './granular-layers/samples/schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { GranularLayersModule } from './granular-layers/granular-layers.module';
import { StabilizedLayers_Sample, StabilizedLayers_SampleSchema } from './stabilized-layers/samples/schemas';
import { StabilizedLayersSamplesModule } from './stabilized-layers/samples/stabilized-layers-samples.module';
import { StabilizedLayersModule } from './stabilized-layers/stabilized-layers.module';
import { BinderAsphaltConcreteModule } from './binder-asphalt-concrete/binder-asphalt-concrete.module';
import { BinderAsphaltConcrete_Sample, BinderAsphaltConcrete_SampleSchema } from './binder-asphalt-concrete/samples/schemas';
import { BinderAsphaltConcreteSamplesModule } from './binder-asphalt-concrete/samples/binder-asphalt-concrete-samples.module';

const Models: ModelDefinition[] = [
  { name: GranularLayers_Sample.name, schema: GranularLayers_SampleSchema },
  { name: StabilizedLayers_Sample.name, schema: StabilizedLayers_SampleSchema },
  { name: BinderAsphaltConcrete_Sample.name, schema: BinderAsphaltConcrete_SampleSchema },
];

const Modules = [
  GranularLayersSamplesModule, 
  StabilizedLayersSamplesModule, 
  BinderAsphaltConcreteSamplesModule
]

@Global()
@Module({
  imports: [
    MongooseModule.forFeature(Models, DATABASE_CONNECTION.PROMEDINA), 
    ...Modules, 
    GranularLayersModule, 
    StabilizedLayersModule, 
    BinderAsphaltConcreteModule
  ], 
  exports: [MongooseModule, ...Modules]
})

export class ProMedinaModule {}

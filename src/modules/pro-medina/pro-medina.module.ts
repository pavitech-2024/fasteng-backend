import { Global, Module } from '@nestjs/common';
import { GranularLayersSamplesModule } from './granular-layers/samples/granular-layers-samples.module';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { GranularLayers_Sample, GranularLayers_SampleSchema } from './granular-layers/samples/schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { GranularLayersModule } from './granular-layers/granular-layers.module';

const Models: ModelDefinition[] = [
  { name: GranularLayers_Sample.name, schema: GranularLayers_SampleSchema }
];

const Modules = [GranularLayersSamplesModule]

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.PROMEDINA), ...Modules, GranularLayersModule], 
  exports: [MongooseModule, ...Modules]
})

export class ProMedinaModule {}

import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { StabilizedLayers_Sample, StabilizedLayers_SampleSchema } from './samples/schemas';
import { StabilizedLayersSamplesModule } from './samples/stabilized-layers-samples.module';

const Models: ModelDefinition[] = [{ name: StabilizedLayers_Sample.name, schema: StabilizedLayers_SampleSchema }];

const Modules = [StabilizedLayersSamplesModule];

@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.PROMEDINA), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class StabilizedLayersModule {}

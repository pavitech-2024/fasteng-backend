import { Module } from '@nestjs/common';
import { GranularLayers_Sample, GranularLayers_SampleSchema } from './samples/schemas';
import { GranularLayersSamplesModule } from './samples/granular-layers-samples.module';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';

const Models: ModelDefinition[] = [{ name: GranularLayers_Sample.name, schema: GranularLayers_SampleSchema }];

const Modules = [GranularLayersSamplesModule];

@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.PROMEDINA), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class GranularLayersModule {}

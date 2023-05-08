import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { SamplesModule } from './samples/samples.module';
import { Sample, SampleSchema } from './samples/schemas';

const Models: ModelDefinition[] = [{ name: Sample.name, schema: SampleSchema }];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.SOILS), SamplesModule],
  exports: [MongooseModule, SamplesModule],
})
export class SoilsModule {}

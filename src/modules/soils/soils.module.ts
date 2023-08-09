import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { SamplesModule } from './samples/samples.module';
import { Sample, SampleSchema } from './samples/schemas';
import { Cbr, CbrSchema } from './essays/cbr/schemas';
import { CbrModule } from './essays/cbr/cbr.module';
import { HrbModule } from './essays/hrb/hrb.module';
import { Hrb, HrbSchema } from './essays/hrb/schemas';

const Models: ModelDefinition[] = [
  { name: Sample.name, schema: SampleSchema },
  { name: Cbr.name, schema: CbrSchema },
  { name: Hrb.name, schema: HrbSchema },
];

const Modules = [SamplesModule, CbrModule, HrbModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.SOILS), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class SoilsModule {}

import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { SamplesModule } from './samples/samples.module';
import { Sample, SampleSchema } from './samples/schemas';
import { Cbr, CbrSchema } from './essays/cbr/schemas';
import { CbrModule } from './essays/cbr/cbr.module';
import { HrbModule } from './essays/hrb/hrb.module';
import { Hrb, HrbSchema } from './essays/hrb/schemas';
import { Sucs, SucsSchema } from './essays/sucs/schemas';
import { SucsModule } from './essays/sucs/sucs.module';
import { Granulometry, GranulometrySchema } from './essays/granulometry/schemas';
import { GranulometryModule } from './essays/granulometry/granulometry.module';
import { CompressionModule } from './essays/compression/compression.module';
import { Compression, CompressionSchema } from './essays/compression/schema';

const Models: ModelDefinition[] = [
  { name: Sample.name, schema: SampleSchema },
  { name: Cbr.name, schema: CbrSchema },
  { name: Hrb.name, schema: HrbSchema },
  { name: Sucs.name, schema: SucsSchema },
  { name: Granulometry.name, schema: GranulometrySchema },
  { name: Compression.name, schema: CompressionSchema },
];

const Modules = [SamplesModule, CbrModule, HrbModule, SucsModule, GranulometryModule, CompressionModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.SOILS), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class SoilsModule {}

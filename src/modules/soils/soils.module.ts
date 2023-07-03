import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { SamplesModule } from './samples/samples.module';
import { Sample, SampleSchema } from './samples/schemas';
import { Cbr, CbrSchema } from './essays/cbr/schemas';
import { CbrModule } from './essays/cbr/cbr.module';
import { CompressionModule } from './essays/compression/compression.module';
import { Compression, CompressionSchema } from './essays/compression/schema';

const Models: ModelDefinition[] = [
  { name: Sample.name, schema: SampleSchema },
  { name: Cbr.name, schema: CbrSchema },
  { name: Compression.name, schema: CompressionSchema}
];

const Modules = [SamplesModule, CbrModule, CompressionModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.SOILS), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class SoilsModule {}

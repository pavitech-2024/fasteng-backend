import { Module } from '@nestjs/common';
import { SamplesController } from './controller';
import { SamplesService } from './service';
import { SamplesRepository } from './repository';

@Module({
  imports: [],
  controllers: [SamplesController],
  providers: [SamplesService, SamplesRepository],
  exports: [SamplesService, SamplesRepository],
})
export class SamplesModule {}

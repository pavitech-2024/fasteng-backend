import { Module } from '@nestjs/common';
import { SamplesController } from './controller';
import { SamplesService } from './service';
import { SamplesRepository } from './repository';
import { GetEssaysBySample_Service } from './service/get-essays-by-sample.service';

const services = [ 
  SamplesService,
  GetEssaysBySample_Service
];

@Module({
  imports: [],
  controllers: [SamplesController],
  providers: [...services, SamplesRepository],
  exports: [SamplesService, SamplesRepository],
})
export class SamplesModule {}

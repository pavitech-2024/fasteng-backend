import { Module } from '@nestjs/common';
import { GranularLayersSamplesService } from './service/granular-layers-samples.service';
import { GranularLayersSamplesController } from './controller/granular-layers-samples.controller';
import { GranularLayers_SamplesRepository } from './repository';

@Module({
  imports: [],
  controllers: [GranularLayersSamplesController],
  providers: [
    GranularLayersSamplesService, 
    GranularLayers_SamplesRepository
  ],
  exports: [
    GranularLayersSamplesService, 
    GranularLayers_SamplesRepository
  ]
})
export class GranularLayersSamplesModule {}

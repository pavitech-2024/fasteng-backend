import { Module } from '@nestjs/common';
import { GranularLayersSamplesService } from './service/granular-layers-samples.service';
import { GranularLayers_SamplesRepository } from './repository';
import { GranularLayersSamplesController } from './controller';

@Module({
  imports: [],
  controllers: [GranularLayersSamplesController],
  providers: [GranularLayersSamplesService, GranularLayers_SamplesRepository],
  exports: [GranularLayersSamplesService, GranularLayers_SamplesRepository],
})
export class GranularLayersSamplesModule {}

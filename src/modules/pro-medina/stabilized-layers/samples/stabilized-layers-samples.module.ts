import { Module } from "@nestjs/common";
import { StabilizedLayersSamplesController } from "./controller";
import { StabilizedLayers_SamplesRepository } from "./repository";
import { StabilizedLayersSamplesService } from "./service/stabilized-layers-samples.service";

@Module({
  imports: [],
  controllers: [StabilizedLayersSamplesController],
  providers: [
    StabilizedLayersSamplesService, 
    StabilizedLayers_SamplesRepository
  ],
  exports: [
    StabilizedLayersSamplesService, 
    StabilizedLayers_SamplesRepository
  ]
})
export class StabilizedLayersSamplesModule {}
import { Module } from '@nestjs/common';
import { MaterialsController } from './controller';
import { MaterialsService } from './service';
import { MaterialsRepository } from './repository';
import { GetEssaysByMaterial_Service } from './service/get-essays-by-material.service';
import { FwdModule } from '../../../modules/asphalt/essays/fwd/fwd.module';

const services = [
  MaterialsService,
  GetEssaysByMaterial_Service
];

@Module({
  imports: [FwdModule],
  controllers: [MaterialsController],
  providers: [...services, MaterialsRepository],
  exports: [MaterialsService, MaterialsRepository],
})
export class MaterialsModule {}

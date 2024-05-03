import { Module } from '@nestjs/common';
import { MaterialsController } from './controller';
import { MaterialsService } from './service';
import { MaterialsRepository } from './repository';
import { GetEssaysByMaterial_Service } from './service/get-essays-by-material.service';

const services = [ 
  MaterialsService,
  GetEssaysByMaterial_Service
];

@Module({
  imports: [],
  controllers: [MaterialsController],
  providers: [...services, MaterialsRepository],
  exports: [MaterialsService, MaterialsRepository],
})
export class MaterialsModule {}

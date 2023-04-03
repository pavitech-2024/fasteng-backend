import { Module } from '@nestjs/common';
import { MaterialsController } from './controller';
import { MaterialsService } from './service';
import { MaterialsRepository } from './repository';

@Module({
  imports: [],
  controllers: [MaterialsController],
  providers: [MaterialsService, MaterialsRepository],
  exports: [MaterialsService, MaterialsRepository],
})
export class MaterialsModule {}

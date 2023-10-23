import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { Rtcd, RtcdSchema } from './essays/rtcd/schemas';
import { RtcdModule } from './essays/rtcd/rtcd.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: Rtcd.name, schema: RtcdSchema },
];

const Modules = [MaterialsModule, RtcdModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, MaterialsModule],
})
export class AsphaltModule {}

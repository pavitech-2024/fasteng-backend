import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { Rtfo, RtfoSchema } from './essays/rtfo/schemas';
import { RtfoModule } from './essays/rtfo/rtfo.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: Rtfo.name, schema: RtfoSchema },
];

const Modules = [MaterialsModule, RtfoModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class AsphaltModule {}

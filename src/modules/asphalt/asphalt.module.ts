import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { SofteningPoint, SofteningPointSchema } from './essays/softeningPoint/schemas';
import { SofteningPointModule } from './essays/softeningPoint/softeningPoint.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: SofteningPoint.name, schema: SofteningPointSchema },
];

const Modules = [MaterialsModule, SofteningPointModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})

export class AsphaltModule {}

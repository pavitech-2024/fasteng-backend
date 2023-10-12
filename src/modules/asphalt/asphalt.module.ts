import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { SayboltFurolModule } from './essays/sayboltFurol/sayboltFurol.module';
import { SayboltFurol, SayboltFurolSchema } from './essays/sayboltFurol/schemas';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: SayboltFurol.name, schema: SayboltFurolSchema },
];

const Modules = [MaterialsModule, SayboltFurolModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})

export class AsphaltModule {}

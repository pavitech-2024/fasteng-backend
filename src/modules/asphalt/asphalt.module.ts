import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { Penetration, PenetrationSchema } from './essays/penetration/schema';
import { PenetrationModule } from './essays/penetration/penetration.module';
import { Adhesion, AdhesionSchema } from './essays/adhesion/schemas';
import { AdhesionModule } from './essays/adhesion/adhesion.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: Penetration.name, schema: PenetrationSchema },
  { name: Adhesion.name, schema: AdhesionSchema },
];

const Modules = [MaterialsModule, PenetrationModule, AdhesionModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class AsphaltModule {}

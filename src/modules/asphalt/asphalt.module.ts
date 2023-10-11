import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { SandEquivalentModule } from './essays/sandEquivalent/sandEquivalent.module';
import { SandEquivalent, SandEquivalentSchema } from './essays/sandEquivalent/schemas';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: SandEquivalent.name, schema: SandEquivalentSchema },
];

const Modules = [MaterialsModule, SandEquivalentModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})

export class AsphaltModule {}
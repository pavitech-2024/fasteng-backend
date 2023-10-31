import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { AsphaltGranulometry, AsphaltGranulometrySchema } from './essays/granulometry/schemas';
import { AsphaltGranulometryModule } from './essays/granulometry/granulometry.module';
import { Penetration, PenetrationSchema } from './essays/penetration/schema';
import { PenetrationModule } from './essays/penetration/penetration.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: AsphaltGranulometry.name, schema: AsphaltGranulometrySchema },
  { name: Penetration.name, schema: PenetrationSchema }
];

const Modules = [
  MaterialsModule,
  AsphaltGranulometryModule,
  PenetrationModule
]

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class AsphaltModule {}

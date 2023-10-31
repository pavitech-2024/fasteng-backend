import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { Rtfo, RtfoSchema } from './essays/rtfo/schemas';
import { RtfoModule } from './essays/rtfo/rtfo.module';
import { AsphaltGranulometry, AsphaltGranulometrySchema } from './essays/granulometry/schemas';
import { AsphaltGranulometryModule } from './essays/granulometry/granulometry.module';
import { Penetration, PenetrationSchema } from './essays/penetration/schema';
import { PenetrationModule } from './essays/penetration/penetration.module';
import { AbrasionModule } from './essays/abrasion/abrasion.module';
import { Abrasion, AbrasionSchema } from './essays/abrasion/schemas';

const Models: ModelDefinition[] = [
  
  { name: Material.name, schema: MaterialSchema },
  { name: Rtfo.name, schema: RtfoSchema },
  { name: AsphaltGranulometry.name, schema: AsphaltGranulometrySchema },
  { name: Penetration.name, schema: PenetrationSchema },
  { name: Abrasion.name, schema: AbrasionSchema }
];

const Modules = [
  MaterialsModule, 
  RtfoModule,
  AsphaltGranulometryModule,
  PenetrationModule,
  AbrasionModule,
]

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class AsphaltModule {}

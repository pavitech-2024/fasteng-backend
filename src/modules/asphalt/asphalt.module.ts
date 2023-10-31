import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { SandEquivalentModule } from './essays/sandEquivalent/sandEquivalent.module';
import { SandEquivalent, SandEquivalentSchema } from './essays/sandEquivalent/schemas';
import { SpecifyMass, SpecifyMassSchema } from './essays/specifyMass/schemas';
import { SpecifyMassModule } from './essays/specifyMass/specifyMass.module';
import { FlashPoint, FlashPointSchema } from './essays/flashPoint/schemas';
import { FlashPointModule } from './essays/flashPoint/flashPoint.module';
import { Ductility, DuctilitySchema } from './essays/ductility/schemas';
import { DuctilityModule } from './essays/ductility/ductility.module';
import { Angularity, AngularitySchema } from './essays/angularity/schemas';
import { AngularityModule } from './essays/angularity/angularity.module';
import { Rtfo, RtfoSchema } from './essays/rtfo/schemas';
import { RtfoModule } from './essays/rtfo/rtfo.module';
import { AsphaltGranulometry, AsphaltGranulometrySchema } from './essays/granulometry/schemas';
import { AsphaltGranulometryModule } from './essays/granulometry/granulometry.module';
import { Penetration, PenetrationSchema } from './essays/penetration/schema';
import { PenetrationModule } from './essays/penetration/penetration.module';
import { Adhesiveness, AdhesivenessSchema } from './essays/adhesiveness/schemas';
import { AdhesivenessModule } from './essays/adhesiveness/adhesiveness.module';
import { AbrasionModule } from './essays/abrasion/abrasion.module';
import { Abrasion, AbrasionSchema } from './essays/abrasion/schemas';

const Models: ModelDefinition[] = [
  
  { name: Material.name, schema: MaterialSchema },
  { name: Rtfo.name, schema: RtfoSchema },
  { name: AsphaltGranulometry.name, schema: AsphaltGranulometrySchema },
  { name: Penetration.name, schema: PenetrationSchema },
  { name: Abrasion.name, schema: AbrasionSchema },
  { name: SpecifyMass.name, schema: SpecifyMassSchema },
  { name: FlashPoint.name, schema: FlashPointSchema },
  { name: Ductility.name, schema: DuctilitySchema },
  { name: Angularity.name, schema: AngularitySchema },
  { name: Adhesiveness.name, schema: AdhesivenessSchema },
  { name: SandEquivalent.name, schema: SandEquivalentSchema },
];

const Modules = [
  MaterialsModule, 
  RtfoModule,
  AsphaltGranulometryModule,
  PenetrationModule,
  AbrasionModule,
  SpecifyMassModule, 
  FlashPointModule, 
  DuctilityModule,
  AdhesivenessModule,
  AngularityModule,
  SandEquivalentModule,
]

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})

export class AsphaltModule {}
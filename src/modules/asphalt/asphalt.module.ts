import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { Rtcd, RtcdSchema } from './essays/rtcd/schemas';
import { RtcdModule } from './essays/rtcd/rtcd.module';
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
import { ShapeIndex, ShapeIndexSchema } from './essays/shapeIndex/schemas';
import { ShapeIndexModule } from './essays/shapeIndex/shapeIndex.module';
import { ElongatedParticles, ElongatedParticlesSchema } from './essays/elongatedParticles/schemas';
import { ElongatedParticlesModule } from './essays/elongatedParticles/elongatedParticles.module';
import { Rtfo, RtfoSchema } from './essays/rtfo/schemas';
import { RtfoModule } from './essays/rtfo/rtfo.module';
import { AsphaltGranulometry, AsphaltGranulometrySchema } from './essays/granulometry/schemas';
import { AsphaltGranulometryModule } from './essays/granulometry/granulometry.module';
import { Penetration, PenetrationSchema } from './essays/penetration/schemas';
import { PenetrationModule } from './essays/penetration/penetration.module';
import { Adhesiveness, AdhesivenessSchema } from './essays/adhesiveness/schemas';
import { AdhesivenessModule } from './essays/adhesiveness/adhesiveness.module';
import { AbrasionModule } from './essays/abrasion/abrasion.module';
import { Abrasion, AbrasionSchema } from './essays/abrasion/schemas';
import { SayboltFurolModule } from './essays/sayboltFurol/sayboltFurol.module';
import { SayboltFurol, SayboltFurolSchema } from './essays/sayboltFurol/schemas';
import { SofteningPoint, SofteningPointSchema } from './essays/softeningPoint/schemas';
import { SofteningPointModule } from './essays/softeningPoint/softeningPoint.module';
import { Ddui, DduiSchema } from './essays/ddui/schemas';
import { DduiModule } from './essays/ddui/ddui.module';
import { ElasticRecovery, ElasticRecoverySchema } from './essays/elasticRecovery/schema';
import { ElasticRecoveryModule } from './essays/elasticRecovery/elasticRecovery.module';
import { ViscosityRotationalModule } from './essays/viscosityRotational/viscosityRotational.module';
import { ViscosityRotational, ViscosityRotationalSchema } from './essays/viscosityRotational/schemas';
import { IggModule } from './essays/igg/igg.module';
import { Igg, IggSchema } from './essays/igg/schemas';

const Models: ModelDefinition[] = [
  
  { name: Material.name, schema: MaterialSchema },
  { name: Rtfo.name, schema: RtfoSchema },
  { name: Rtcd.name, schema: RtcdSchema },
  { name: AsphaltGranulometry.name, schema: AsphaltGranulometrySchema },
  { name: Penetration.name, schema: PenetrationSchema },
  { name: Abrasion.name, schema: AbrasionSchema },
  { name: SpecifyMass.name, schema: SpecifyMassSchema },
  { name: FlashPoint.name, schema: FlashPointSchema },
  { name: Ductility.name, schema: DuctilitySchema },
  { name: Angularity.name, schema: AngularitySchema },
  { name: Adhesiveness.name, schema: AdhesivenessSchema },
  { name: SandEquivalent.name, schema: SandEquivalentSchema },
  { name: SayboltFurol.name, schema: SayboltFurolSchema },
  { name: SofteningPoint.name, schema: SofteningPointSchema },
  { name: Ddui.name, schema: DduiSchema },
  { name: ShapeIndex.name, schema: ShapeIndexSchema },
  { name: ElongatedParticles.name, schema: ElongatedParticlesSchema },
  { name: ElasticRecovery.name, schema: ElasticRecoverySchema },
  { name: ViscosityRotational.name, schema: ViscosityRotationalSchema },
  { name: Igg.name, schema: IggSchema },
];

const Modules = [
  MaterialsModule, 
  RtfoModule,
  RtcdModule,
  AsphaltGranulometryModule,
  PenetrationModule,
  AbrasionModule,
  SpecifyMassModule, 
  FlashPointModule, 
  DuctilityModule,
  AdhesivenessModule,
  AngularityModule,
  SandEquivalentModule,
  SayboltFurolModule,
  SofteningPointModule,
  DduiModule,
  ShapeIndexModule, 
  ElongatedParticlesModule,
  ElasticRecoveryModule,
  ViscosityRotationalModule,
  IggModule,
]

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, MaterialsModule],
})

export class AsphaltModule {}

import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
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


const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: SpecifyMass.name, schema: SpecifyMassSchema },
  { name: FlashPoint.name, schema: FlashPointSchema },
  { name: Ductility.name, schema: DuctilitySchema },
  { name: Angularity.name, schema: AngularitySchema },
  { name: ShapeIndex.name, schema: ShapeIndexSchema },
];

const Modules = [MaterialsModule, SpecifyMassModule, FlashPointModule, DuctilityModule, AngularityModule, ShapeIndexModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class AsphaltModule {}

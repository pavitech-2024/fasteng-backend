import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { ChapmanModule } from './essays/chapman/champan.module';
import { Chapman, ChapmanSchema } from './essays/chapman/schemas';
import { ABCP, ABCPSchema } from './dosages/abcp/schemas';
import { ABCPModule } from './dosages/abcp/abcp.module';
import { Granulometry, GranulometrySchema } from './essays/granulometry/schemas';
import { ConcreteGranulometryModule } from './essays/granulometry/granulometry.module';
import { UnitMassModule } from './essays/unitMass/unitMass.module';
import { UnitMass, UnitMassSchema } from './essays/unitMass/schemas';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: Chapman.name, schema: ChapmanSchema },
  { name: ABCP.name, schema: ABCPSchema },
  { name: Granulometry.name, schema: GranulometrySchema },
  { name: UnitMass.name, schema: UnitMassSchema }
];

const Modules = [MaterialsModule, ChapmanModule, ABCPModule, ConcreteGranulometryModule, UnitMassModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.CONCRETE), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class ConcreteModule { }

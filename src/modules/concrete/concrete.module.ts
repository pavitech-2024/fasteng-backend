import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { SandIncreaseModule } from './essays/sand-increase/sand-increase.module';
import { SandIncrease, SandIncreaseSchema } from './essays/sand-increase/schema';
import { ChapmanModule } from './essays/chapman/champan.module';
import { Chapman, ChapmanSchema } from './essays/chapman/schemas';
import { Granulometry, GranulometrySchema } from './essays/granulometry/schemas';
import { ConcreteGranulometryModule } from './essays/granulometry/granulometry.module';
import { UnitMassModule } from './essays/unitMass/unitMass.module';
import { UnitMass, UnitMassSchema } from './essays/unitMass/schemas';
// import { CoarseAggregate, CoarseAggregateSchema } from './essays/coarseAggregate/schemas';
// import { CoarseAggregateModule } from './essays/coarseAggregate/coarseAggregate.module';
import { ABCP, ABCPSchema } from './dosages/abcp/schemas';
import { ABCPModule } from './dosages/abcp/abcp.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: SandIncrease.name, schema: SandIncreaseSchema },
  { name: Material.name, schema: MaterialSchema },
  { name: Chapman.name, schema: ChapmanSchema },
  { name: Granulometry.name, schema: GranulometrySchema },
  { name: UnitMass.name, schema: UnitMassSchema },
  // { name: CoarseAggregate.name, schema: CoarseAggregateSchema },
  { name: ABCP.name, schema: ABCPSchema },
];

const Modules = [
  MaterialsModule, 
  SandIncreaseModule, 
  ChapmanModule, 
  ConcreteGranulometryModule, 
  UnitMassModule,
  // CoarseAggregateModule,
  ABCPModule, 
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.CONCRETE), ...Modules],
  exports: [MongooseModule, ...Modules],
})

export class ConcreteModule { }

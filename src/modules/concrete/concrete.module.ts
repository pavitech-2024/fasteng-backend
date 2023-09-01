import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { SandIncreaseModule } from './essays/sand-increase/sand-increase.module';
import { SandIncrease, SandIncreaseSchema } from './essays/sand-increase/schema';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: SandIncrease.name, schema: SandIncreaseSchema },
];

const Modules = [MaterialsModule, SandIncreaseModule];

@Global()
@Module({
  imports: [
    MongooseModule.forFeature(Models, DATABASE_CONNECTION.CONCRETE), 
    ...Modules
  ],
  exports: [
    MongooseModule, 
    ...Modules
  ],
})
export class ConcreteModule {}

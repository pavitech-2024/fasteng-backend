import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { ChapmanModule } from './essays/chapman/champan.module';
import { Chapman, ChapmanSchema } from './essays/chapman/schemas';
import { ABCP, ABCPSchema } from './dosages/abcp/schemas';
import { ABCPModule } from './dosages/abcp/abcp.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: Chapman.name, schema: ChapmanSchema },
  { name: ABCP.name, schema: ABCPSchema },
];

const Modules = [MaterialsModule, ChapmanModule, ABCPModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.CONCRETE), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class ConcreteModule {}

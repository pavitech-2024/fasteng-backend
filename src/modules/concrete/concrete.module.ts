import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { ChapmanModule } from './essays/chapman/champan.module';
import { Chapman, ChapmanSchema } from './essays/chapman/schemas';
import { ConcreteGranulometry, ConcreteGranulometrySchema } from './essays/granulometry/schemas';
import { ConcreteGranulometryModule } from 'modules/concrete/essays/granulometry/granulometry.module';

const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: Chapman.name, schema: ChapmanSchema },
  { name: ConcreteGranulometry.name, schema: ConcreteGranulometrySchema}
];

const Modules = [MaterialsModule, ChapmanModule, ConcreteGranulometryModule];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.CONCRETE), ...Modules],
  exports: [MongooseModule, ...Modules],
})
export class ConcreteModule {}

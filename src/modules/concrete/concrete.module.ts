import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { MaterialsModule } from './materials/materials.module';
import { Material, MaterialSchema } from './materials/schemas';
import { SandSwellingModule } from './essays/sand-swelling/sand-swelling.module';
import { SandSwelling, SandSwellingSchema } from './essays/sand-swelling/schema';


const Models: ModelDefinition[] = [
  { name: Material.name, schema: MaterialSchema },
  { name: SandSwelling.name, schema: SandSwellingSchema },
];

const Modules = [MaterialsModule, SandSwellingModule];

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

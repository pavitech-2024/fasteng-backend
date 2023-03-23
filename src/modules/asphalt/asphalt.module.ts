import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'src/infra/mongoose/database.config';

const Models: ModelDefinition[] = [];

@Module({
  imports: [MongooseModule.forFeature(Models, DATABASE_CONNECTION.ASPHALT)],
  exports: [MongooseModule],
})
export class AsphaltModule {}

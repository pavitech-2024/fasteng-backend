import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from './database.config';
import {
  AsphaltDatabaseConfig,
  CommonDatabaseConfig,
  ConcreteDatabaseConfig,
  PromedinaDatabaseConfig,
  SoilsDatabaseConfig,
} from './mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: CommonDatabaseConfig,
      connectionName: DATABASE_CONNECTION.COMMON,
    }),
    MongooseModule.forRootAsync({
      useClass: AsphaltDatabaseConfig,
      connectionName: DATABASE_CONNECTION.ASPHALT,
    }),
    MongooseModule.forRootAsync({
      useClass: SoilsDatabaseConfig,
      connectionName: DATABASE_CONNECTION.SOILS,
    }),
    MongooseModule.forRootAsync({
      useClass: ConcreteDatabaseConfig,
      connectionName: DATABASE_CONNECTION.CONCRETE,
    }),
    MongooseModule.forRootAsync({
      useClass: PromedinaDatabaseConfig,
      connectionName: DATABASE_CONNECTION.PROMEDINA,
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

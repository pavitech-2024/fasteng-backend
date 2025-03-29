import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from './database.config';

@Injectable()
export class CommonDatabaseConfig implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE_USER');
    const password = this.config.get('DATABASE_PASSWORD');
    const host = this.config.get('DATABASE_HOST');

    const uri = `mongodb+srv://${username}:${password}@${host}/${DATABASE_CONNECTION.COMMON}?retryWrites=true&w=majority`;
    return {
      uri,
    };
  }
}

@Injectable()
export class AsphaltDatabaseConfig implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE_USER');
    const password = this.config.get('DATABASE_PASSWORD');
    const host = this.config.get('DATABASE_HOST');

    const uri = `mongodb+srv://${username}:${password}@${host}/${DATABASE_CONNECTION.ASPHALT}?retryWrites=true&w=majority`;

    return {
      uri,
    };
  }
}

@Injectable()
export class SoilsDatabaseConfig implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE_USER');
    const password = this.config.get('DATABASE_PASSWORD');
    const host = this.config.get('DATABASE_HOST');

    const uri = `mongodb+srv://${username}:${password}@${host}/${DATABASE_CONNECTION.SOILS}?retryWrites=true&w=majority`;

    return {
      uri,
    };
  }
}

@Injectable()
export class ConcreteDatabaseConfig implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE_USER');
    const password = this.config.get('DATABASE_PASSWORD');
    const host = this.config.get('DATABASE_HOST');

    const uri = `mongodb+srv://${username}:${password}@${host}/${DATABASE_CONNECTION.CONCRETE}?retryWrites=true&w=majority`;

    return {
      uri,
    };
  }
}

@Injectable()
export class PromedinaDatabaseConfig implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE_USER');
    const password = this.config.get('DATABASE_PASSWORD');
    const host = this.config.get('DATABASE_HOST');

    const uri = `mongodb+srv://${username}:${password}@${host}/${DATABASE_CONNECTION.PROMEDINA}?retryWrites=true&w=majority`;

    return {
      uri,
    };
  }
}
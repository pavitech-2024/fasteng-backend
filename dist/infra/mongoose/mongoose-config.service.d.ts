import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
export declare class CommonDatabaseConfig implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
export declare class AsphaltDatabaseConfig implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
export declare class SoilsDatabaseConfig implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
export declare class ConcreteDatabaseConfig implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
export declare class PromedinaDatabaseConfig implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}

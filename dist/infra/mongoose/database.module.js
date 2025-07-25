"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("./database.config");
const mongoose_config_service_1 = require("./mongoose-config.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_service_1.CommonDatabaseConfig,
                connectionName: database_config_1.DATABASE_CONNECTION.COMMON,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_service_1.AsphaltDatabaseConfig,
                connectionName: database_config_1.DATABASE_CONNECTION.ASPHALT,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_service_1.SoilsDatabaseConfig,
                connectionName: database_config_1.DATABASE_CONNECTION.SOILS,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_service_1.ConcreteDatabaseConfig,
                connectionName: database_config_1.DATABASE_CONNECTION.CONCRETE,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_service_1.PromedinaDatabaseConfig,
                connectionName: database_config_1.DATABASE_CONNECTION.PROMEDINA,
            }),
        ],
        exports: [mongoose_1.MongooseModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map
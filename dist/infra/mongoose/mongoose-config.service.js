"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromedinaDatabaseConfig = exports.ConcreteDatabaseConfig = exports.SoilsDatabaseConfig = exports.AsphaltDatabaseConfig = exports.CommonDatabaseConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./database.config");
let CommonDatabaseConfig = class CommonDatabaseConfig {
    constructor(config) {
        this.config = config;
    }
    createMongooseOptions() {
        const username = this.config.get('DATABASE_USER');
        const password = this.config.get('DATABASE_PASSWORD');
        const host = this.config.get('DATABASE_HOST');
        const uri = `mongodb+srv://${username}:${password}@${host}/${database_config_1.DATABASE_CONNECTION.COMMON}?retryWrites=true&w=majority`;
        return {
            uri,
        };
    }
};
CommonDatabaseConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CommonDatabaseConfig);
exports.CommonDatabaseConfig = CommonDatabaseConfig;
let AsphaltDatabaseConfig = class AsphaltDatabaseConfig {
    constructor(config) {
        this.config = config;
    }
    createMongooseOptions() {
        const username = this.config.get('DATABASE_USER');
        const password = this.config.get('DATABASE_PASSWORD');
        const host = this.config.get('DATABASE_HOST');
        const uri = `mongodb+srv://${username}:${password}@${host}/${database_config_1.DATABASE_CONNECTION.ASPHALT}?retryWrites=true&w=majority`;
        return {
            uri,
        };
    }
};
AsphaltDatabaseConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AsphaltDatabaseConfig);
exports.AsphaltDatabaseConfig = AsphaltDatabaseConfig;
let SoilsDatabaseConfig = class SoilsDatabaseConfig {
    constructor(config) {
        this.config = config;
    }
    createMongooseOptions() {
        const username = this.config.get('DATABASE_USER');
        const password = this.config.get('DATABASE_PASSWORD');
        const host = this.config.get('DATABASE_HOST');
        const uri = `mongodb+srv://${username}:${password}@${host}/${database_config_1.DATABASE_CONNECTION.SOILS}?retryWrites=true&w=majority`;
        return {
            uri,
        };
    }
};
SoilsDatabaseConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SoilsDatabaseConfig);
exports.SoilsDatabaseConfig = SoilsDatabaseConfig;
let ConcreteDatabaseConfig = class ConcreteDatabaseConfig {
    constructor(config) {
        this.config = config;
    }
    createMongooseOptions() {
        const username = this.config.get('DATABASE_USER');
        const password = this.config.get('DATABASE_PASSWORD');
        const host = this.config.get('DATABASE_HOST');
        const uri = `mongodb+srv://${username}:${password}@${host}/${database_config_1.DATABASE_CONNECTION.CONCRETE}?retryWrites=true&w=majority`;
        return {
            uri,
        };
    }
};
ConcreteDatabaseConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConcreteDatabaseConfig);
exports.ConcreteDatabaseConfig = ConcreteDatabaseConfig;
let PromedinaDatabaseConfig = class PromedinaDatabaseConfig {
    constructor(config) {
        this.config = config;
    }
    createMongooseOptions() {
        const username = this.config.get('DATABASE_USER');
        const password = this.config.get('DATABASE_PASSWORD');
        const host = this.config.get('DATABASE_HOST');
        const uri = `mongodb+srv://${username}:${password}@${host}/${database_config_1.DATABASE_CONNECTION.PROMEDINA}?retryWrites=true&w=majority`;
        return {
            uri,
        };
    }
};
PromedinaDatabaseConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PromedinaDatabaseConfig);
exports.PromedinaDatabaseConfig = PromedinaDatabaseConfig;
//# sourceMappingURL=mongoose-config.service.js.map
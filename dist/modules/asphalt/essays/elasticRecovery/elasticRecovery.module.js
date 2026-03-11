"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticRecoveryModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const calc_elasticRecovery_service_1 = require("./service/calc.elasticRecovery.service");
const general_data_elasticRecovery_service_1 = require("./service/general-data.elasticRecovery.service");
const services = [service_1.ElasticRecoveryService, general_data_elasticRecovery_service_1.GeneralData_ElasticRecovery_Service, calc_elasticRecovery_service_1.Calc_ElasticRecovery_Service];
let ElasticRecoveryModule = class ElasticRecoveryModule {
};
exports.ElasticRecoveryModule = ElasticRecoveryModule;
exports.ElasticRecoveryModule = ElasticRecoveryModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.ElasticRecoveryController],
        providers: [...services, repository_1.ElasticRecoveryRepository],
        exports: [service_1.ElasticRecoveryService, repository_1.ElasticRecoveryRepository],
    })
], ElasticRecoveryModule);
//# sourceMappingURL=elasticRecovery.module.js.map
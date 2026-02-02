"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenetrationModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const calc_penetration_service_1 = require("./service/calc.penetration.service");
const general_data_penetration_service_1 = require("./service/general-data.penetration.service");
const services = [service_1.PenetrationService, general_data_penetration_service_1.GeneralData_Penetration_Service, calc_penetration_service_1.Calc_Penetration_Service];
let PenetrationModule = class PenetrationModule {
};
exports.PenetrationModule = PenetrationModule;
exports.PenetrationModule = PenetrationModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.PenetrationController],
        providers: [...services, repository_1.PenetrationRepository],
        exports: [service_1.PenetrationService, repository_1.PenetrationRepository],
    })
], PenetrationModule);
//# sourceMappingURL=penetration.module.js.map
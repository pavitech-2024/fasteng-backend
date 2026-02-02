"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitMassModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const general_data_unitMass_service_1 = require("./service/general-data.unitMass.service");
const service_1 = require("./service");
const step2Data_unitMass_service_1 = require("./service/step2Data.unitMass.service");
const result_unitMass_service_1 = require("./service/result.unitMass.service");
const services = [
    service_1.UnitMassService,
    general_data_unitMass_service_1.GeneralData_UnitMass_Service,
    step2Data_unitMass_service_1.step2Data_Service,
    result_unitMass_service_1.Result_UnitMass_Service
];
let UnitMassModule = class UnitMassModule {
};
exports.UnitMassModule = UnitMassModule;
exports.UnitMassModule = UnitMassModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.UnitMassController],
        providers: [...services, repository_1.UnitMassRepository],
        exports: [service_1.UnitMassService, repository_1.UnitMassRepository],
    })
], UnitMassModule);
//# sourceMappingURL=unitMass.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdhesivenessModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const general_data_adhesiveness_service_1 = require("./service/general-data.adhesiveness.service");
const calc_adhesiveness_service_1 = require("./service/calc.adhesiveness.service");
const services = [service_1.AdhesivenessService, general_data_adhesiveness_service_1.GeneralData_Adhesiveness_Service, calc_adhesiveness_service_1.Calc_Adhesiveness_Service];
let AdhesivenessModule = class AdhesivenessModule {
};
AdhesivenessModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.AdhesivenessController],
        providers: [...services, repository_1.AdhesivenessRepository],
        exports: [service_1.AdhesivenessService, repository_1.AdhesivenessRepository],
    })
], AdhesivenessModule);
exports.AdhesivenessModule = AdhesivenessModule;
//# sourceMappingURL=adhesiveness.module.js.map
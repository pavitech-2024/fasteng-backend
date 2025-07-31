"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SofteningPointModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const calc_softeningPoint_softeningPoint_service_1 = require("./service/calc-softeningPoint.softeningPoint.service");
const general_data_softeningPoint_service_1 = require("./service/general-data.softeningPoint.service");
const service_1 = require("./service");
const penetration_module_1 = require("../penetration/penetration.module");
const services = [service_1.SofteningPointService, general_data_softeningPoint_service_1.GeneralData_SofteningPoint_Service, calc_softeningPoint_softeningPoint_service_1.Calc_SofteningPoint_Service];
let SofteningPointModule = class SofteningPointModule {
};
exports.SofteningPointModule = SofteningPointModule;
exports.SofteningPointModule = SofteningPointModule = __decorate([
    (0, common_1.Module)({
        imports: [penetration_module_1.PenetrationModule],
        controllers: [controller_1.SofteningPointController],
        providers: [...services, repository_1.SofteningPointRepository],
        exports: [service_1.SofteningPointService, repository_1.SofteningPointRepository],
    })
], SofteningPointModule);
//# sourceMappingURL=softeningPoint.module.js.map
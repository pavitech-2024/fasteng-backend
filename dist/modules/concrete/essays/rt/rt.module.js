"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteRtModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const general_data_rt_service_1 = require("./service/general-data.rt.service");
const calc_rt_service_1 = require("./service/calc.rt.service");
const services = [service_1.ConcreteRtService, general_data_rt_service_1.GeneralData_CONCRETERT_Service, calc_rt_service_1.Calc_ConcreteRt_Service];
let ConcreteRtModule = class ConcreteRtModule {
};
exports.ConcreteRtModule = ConcreteRtModule;
exports.ConcreteRtModule = ConcreteRtModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.ConcreteRtController],
        providers: [...services, repository_1.ConcreteRtRepository],
        exports: [service_1.ConcreteRtService, repository_1.ConcreteRtRepository],
    })
], ConcreteRtModule);
//# sourceMappingURL=rt.module.js.map
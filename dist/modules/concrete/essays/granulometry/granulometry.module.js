"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteGranulometryModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const repository_1 = require("./repository");
const general_data_granulometry_service_1 = require("./service/general-data.granulometry.service");
const calc_granulometry_service_1 = require("./service/calc.granulometry.service");
const services = [service_1.ConcreteGranulometryService, general_data_granulometry_service_1.GeneralData_CONCRETEGRANULOMETRY_Service, calc_granulometry_service_1.Calc_CONCRETEGRANULOMETRY_Service];
let ConcreteGranulometryModule = class ConcreteGranulometryModule {
};
exports.ConcreteGranulometryModule = ConcreteGranulometryModule;
exports.ConcreteGranulometryModule = ConcreteGranulometryModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.ConcreteGranulometryController],
        providers: [...services, repository_1.ConcreteGranulometryRepository],
        exports: [service_1.ConcreteGranulometryService, repository_1.ConcreteGranulometryRepository],
    })
], ConcreteGranulometryModule);
//# sourceMappingURL=granulometry.module.js.map
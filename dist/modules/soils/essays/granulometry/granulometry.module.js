"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranulometryModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const repository_1 = require("./repository");
const general_data_granulometry_service_1 = require("./service/general-data.granulometry.service");
const calc_granulometry_service_1 = require("./service/calc.granulometry.service");
const services = [service_1.GranulometryService, general_data_granulometry_service_1.GeneralData_GRANULOMETRY_Service, calc_granulometry_service_1.Calc_GRANULOMETRY_Service];
let GranulometryModule = class GranulometryModule {
};
GranulometryModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.GranulometryController],
        providers: [...services, repository_1.GranulometryRepository],
        exports: [service_1.GranulometryService, repository_1.GranulometryRepository],
    })
], GranulometryModule);
exports.GranulometryModule = GranulometryModule;
//# sourceMappingURL=granulometry.module.js.map
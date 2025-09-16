"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularityModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const index_1 = require("./service/index");
const repository_1 = require("./repository");
const calc_angularity_service_1 = require("./service/calc.angularity.service");
const general_data_angularity_service_1 = require("./service/general-data.angularity.service");
const services = [index_1.AngularityService, general_data_angularity_service_1.GeneralData_ANGULARITY_Service, calc_angularity_service_1.Calc_ANGULARITY_Service];
let AngularityModule = class AngularityModule {
};
AngularityModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.AngularityController],
        providers: [...services, repository_1.AngularityRepository],
        exports: [index_1.AngularityService, repository_1.AngularityRepository],
    })
], AngularityModule);
exports.AngularityModule = AngularityModule;
//# sourceMappingURL=angularity.module.js.map
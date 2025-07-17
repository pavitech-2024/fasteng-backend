"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayboltFurolModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const calc_sayboltFurol_service_1 = require("./service/calc.sayboltFurol.service");
const general_data_sayboltFurol_service_1 = require("./service/general-data.sayboltFurol.service");
const service_1 = require("./service");
const services = [service_1.SayboltFurolService, general_data_sayboltFurol_service_1.GeneralData_SayboltFurol_Service, calc_sayboltFurol_service_1.Calc_SayboltFurol_Service];
let SayboltFurolModule = class SayboltFurolModule {
};
exports.SayboltFurolModule = SayboltFurolModule;
exports.SayboltFurolModule = SayboltFurolModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.SayboltFurolController],
        providers: [...services, repository_1.SayboltFurolRepository],
        exports: [service_1.SayboltFurolService, repository_1.SayboltFurolRepository],
    })
], SayboltFurolModule);
//# sourceMappingURL=sayboltFurol.module.js.map
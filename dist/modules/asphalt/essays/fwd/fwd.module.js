"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FwdModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const services_1 = require("./services");
const general_data_fwd_service_1 = require("./services/general-data.fwd.service");
const calc_fwd_service_1 = require("./services/calc.fwd.service");
const services = [services_1.FwdService, general_data_fwd_service_1.GeneralData_Fwd_Service, calc_fwd_service_1.Calc_Fwd_Service];
let FwdModule = class FwdModule {
};
FwdModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.FwdController],
        providers: [...services, repository_1.FwdRepository],
        exports: [services_1.FwdService, repository_1.FwdRepository],
    })
], FwdModule);
exports.FwdModule = FwdModule;
//# sourceMappingURL=fwd.module.js.map
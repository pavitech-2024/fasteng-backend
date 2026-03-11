"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SucsModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const index_1 = require("./service/index");
const repository_1 = require("./repository");
const general_data_sucs_service_1 = require("./service/general-data.sucs.service");
const calc_sucs_service_1 = require("./service/calc.sucs.service");
const services = [index_1.SucsService, general_data_sucs_service_1.GeneralData_SUCS_Service, calc_sucs_service_1.Calc_SUCS_Service];
let SucsModule = class SucsModule {
};
exports.SucsModule = SucsModule;
exports.SucsModule = SucsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.SucsController],
        providers: [...services, repository_1.SucsRepository],
        exports: [index_1.SucsService, repository_1.SucsRepository],
    })
], SucsModule);
//# sourceMappingURL=sucs.module.js.map
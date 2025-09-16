"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbrModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const repository_1 = require("./repository");
const general_data_cbr_service_1 = require("./service/general-data.cbr.service");
const calc_cbr_service_1 = require("./service/calc.cbr.service");
const services = [service_1.CbrService, general_data_cbr_service_1.GeneralData_CBR_Service, calc_cbr_service_1.Calc_CBR_Service];
let CbrModule = class CbrModule {
};
CbrModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.CbrController],
        providers: [...services, repository_1.CbrRepository],
        exports: [service_1.CbrService, repository_1.CbrRepository],
    })
], CbrModule);
exports.CbrModule = CbrModule;
//# sourceMappingURL=cbr.module.js.map
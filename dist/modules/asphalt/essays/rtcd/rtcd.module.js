"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtcdModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const calc_rtcd_service_1 = require("./service/calc.rtcd.service");
const general_data_rtcd_service_1 = require("./service/general-data.rtcd.service");
const rtcd_service_1 = require("./service/rtcd.service");
const services = [rtcd_service_1.RtcdService, general_data_rtcd_service_1.GeneralData_Rtcd_Service, calc_rtcd_service_1.Calc_Rtcd_Service];
let RtcdModule = class RtcdModule {
};
exports.RtcdModule = RtcdModule;
exports.RtcdModule = RtcdModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.RtcdController],
        providers: [...services, repository_1.RtcdRepository],
        exports: [rtcd_service_1.RtcdService, repository_1.RtcdRepository],
    })
], RtcdModule);
//# sourceMappingURL=rtcd.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteRcModule = void 0;
const modules_1 = require("@nestjs/common/decorators/modules");
const controller_1 = require("./controller");
const respository_1 = require("./respository");
const service_1 = require("./service");
const calc_rc_service_1 = require("./service/calc.rc.service");
const general_data_rc_service_1 = require("./service/general-data.rc.service");
const services = [
    service_1.ConcreteRcService,
    general_data_rc_service_1.GeneralData_CONCRETERC_Service,
    calc_rc_service_1.Calc_CONCRETERC_Service,
];
let ConcreteRcModule = class ConcreteRcModule {
};
ConcreteRcModule = __decorate([
    (0, modules_1.Module)({
        imports: [],
        controllers: [controller_1.ConcreteRcController],
        providers: [...services, respository_1.ConcreteRCRepository],
        exports: [service_1.ConcreteRcService, respository_1.ConcreteRCRepository],
    })
], ConcreteRcModule);
exports.ConcreteRcModule = ConcreteRcModule;
//# sourceMappingURL=rc.module.js.map
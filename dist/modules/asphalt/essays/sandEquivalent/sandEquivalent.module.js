"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandEquivalentModule = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./repository");
const controller_1 = require("./controller");
const calc_sandEquivalent_service_1 = require("./service/calc.sandEquivalent.service");
const general_data_sandEquivalent_service_1 = require("./service/general-data.sandEquivalent.service");
const service_1 = require("./service");
const services = [service_1.SandEquivalentService, general_data_sandEquivalent_service_1.GeneralData_SandEquivalent_Service, calc_sandEquivalent_service_1.Calc_SandEquivalent_Service];
let SandEquivalentModule = class SandEquivalentModule {
};
exports.SandEquivalentModule = SandEquivalentModule;
exports.SandEquivalentModule = SandEquivalentModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.SandEquivalentController],
        providers: [...services, repository_1.SandEquivalentRepository],
        exports: [service_1.SandEquivalentService, repository_1.SandEquivalentRepository],
    })
], SandEquivalentModule);
//# sourceMappingURL=sandEquivalent.module.js.map
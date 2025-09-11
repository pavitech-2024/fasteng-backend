"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbrasionModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const calc_abrasion_service_1 = require("./service/calc.abrasion.service");
const general_data_abrasion_service_1 = require("./service/general-data.abrasion.service");
const services = [service_1.AbrasionService, general_data_abrasion_service_1.GeneralData_Abrasion_Service, calc_abrasion_service_1.Calc_Abrasion_Service];
let AbrasionModule = class AbrasionModule {
};
AbrasionModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.AbrasionController],
        providers: [...services, repository_1.AbrasionRepository],
        exports: [service_1.AbrasionService, repository_1.AbrasionRepository],
    })
], AbrasionModule);
exports.AbrasionModule = AbrasionModule;
//# sourceMappingURL=abrasion.module.js.map
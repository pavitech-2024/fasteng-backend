"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandIncreaseModule = void 0;
const common_1 = require("@nestjs/common");
const general_data_sand_increase_service_1 = require("./service/general-data.sand-increase.service");
const calc_sand_increase_service_1 = require("./service/calc.sand-increase.service");
const repository_1 = require("./repository");
const service_1 = require("./service");
const controller_1 = require("./controller");
const calc_unitMass_service_1 = require("./service/calc.unitMass.service");
const calc_moistureContents_service_1 = require("./service/calc.moistureContents.service");
const services = [service_1.SandIncreaseService, general_data_sand_increase_service_1.GeneralData_SandIncrease_Service, calc_unitMass_service_1.Calc_UnitMass_Service, calc_moistureContents_service_1.Calc_MoistureContent_Service, calc_sand_increase_service_1.Calc_SandIncrease_Service];
let SandIncreaseModule = class SandIncreaseModule {
};
exports.SandIncreaseModule = SandIncreaseModule;
exports.SandIncreaseModule = SandIncreaseModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.SandIncreaseController],
        providers: [...services, repository_1.SandIncreaseRepository],
        exports: [service_1.SandIncreaseService, repository_1.SandIncreaseRepository]
    })
], SandIncreaseModule);
//# sourceMappingURL=sand-increase.module.js.map
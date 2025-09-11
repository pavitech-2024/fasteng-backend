"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecifyMassModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const index_1 = require("./service/index");
const repository_1 = require("./repository");
const general_data_specifyMass_service_1 = require("./service/general-data.specifyMass.service");
const calc_specifyMass_service_1 = require("./service/calc.specifyMass.service");
const services = [index_1.SpecifyMassService, general_data_specifyMass_service_1.GeneralData_SPECIFYMASS_Service, calc_specifyMass_service_1.Calc_SPECIFYMASS_Service];
let SpecifyMassModule = class SpecifyMassModule {
};
SpecifyMassModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.SpecifyMassController],
        providers: [...services, repository_1.SpecifyMassRepository],
        exports: [index_1.SpecifyMassService, repository_1.SpecifyMassRepository],
    })
], SpecifyMassModule);
exports.SpecifyMassModule = SpecifyMassModule;
//# sourceMappingURL=specifyMass.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViscosityRotationalModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const calc_viscosityRotational_service_1 = require("./service/calc.viscosityRotational.service");
const general_data_viscosityRotational_service_1 = require("./service/general-data.viscosityRotational.service");
const viscosityRotational_service_1 = require("./service/viscosityRotational.service");
const initial_binder_trial_service_1 = require("../../dosages/marshall/service/initial-binder-trial.service");
const marshall_module_1 = require("../../dosages/marshall/marshall.module");
const services = [
    viscosityRotational_service_1.ViscosityRotationalService,
    general_data_viscosityRotational_service_1.GeneralData_ViscosityRotational_Service,
    calc_viscosityRotational_service_1.Calc_ViscosityRotational_Service,
    initial_binder_trial_service_1.SetBinderTrial_Marshall_Service
];
let ViscosityRotationalModule = class ViscosityRotationalModule {
};
exports.ViscosityRotationalModule = ViscosityRotationalModule;
exports.ViscosityRotationalModule = ViscosityRotationalModule = __decorate([
    (0, common_1.Module)({
        imports: [marshall_module_1.MarshallModule],
        controllers: [controller_1.ViscosityRotationalController],
        providers: [...services, repository_1.ViscosityRotationalRepository],
        exports: [viscosityRotational_service_1.ViscosityRotationalService, repository_1.ViscosityRotationalRepository],
    })
], ViscosityRotationalModule);
//# sourceMappingURL=viscosityRotational.module.js.map
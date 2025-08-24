"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarshallModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const general_data_marshall_service_1 = require("./service/general-data.marshall.service");
const material_selection_marshall_service_1 = require("./service/material-selection.marshall.service");
const granulometry_composition_marshall_service_1 = require("./service/granulometry-composition.marshall.service");
const initial_binder_trial_service_1 = require("./service/initial-binder-trial.service");
const maximumMixtureDensity_service_1 = require("./service/maximumMixtureDensity.service");
const volumetric_parameters_service_1 = require("./service/volumetric-parameters.service");
const optimum_binder_marshall_service_1 = require("./service/optimum-binder.marshall.service");
const confirm_compression_marshall_service_1 = require("./service/confirm-compression.marshall.service");
const base_marshall_service_1 = require("./service/base.marshall.service");
const services = [
    service_1.MarshallService,
    general_data_marshall_service_1.GeneralData_Marshall_Service,
    material_selection_marshall_service_1.MaterialSelection_Marshall_Service,
    granulometry_composition_marshall_service_1.GranulometryComposition_Marshall_Service,
    initial_binder_trial_service_1.SetBinderTrial_Marshall_Service,
    maximumMixtureDensity_service_1.MaximumMixtureDensity_Marshall_Service,
    volumetric_parameters_service_1.VolumetricParameters_Marshall_Service,
    optimum_binder_marshall_service_1.OptimumBinderContent_Marshall_Service,
    confirm_compression_marshall_service_1.ConfirmCompression_Marshall_Service,
    base_marshall_service_1.BaseMarshallService
];
let MarshallModule = class MarshallModule {
};
exports.MarshallModule = MarshallModule;
exports.MarshallModule = MarshallModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.MarshallController],
        providers: [...services, repository_1.MarshallRepository],
        exports: [service_1.MarshallService, repository_1.MarshallRepository],
    })
], MarshallModule);
//# sourceMappingURL=marshall.module.js.map
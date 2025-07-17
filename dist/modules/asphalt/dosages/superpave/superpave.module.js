"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperpaveModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const general_data_superpave_service_1 = require("./service/general-data.superpave.service");
const material_selection_superpave_service_1 = require("./service/material-selection.superpave.service");
const granulometry_composition_superpave_service_1 = require("./service/granulometry-composition.superpave.service");
const initial_binder_superpave_service_1 = require("./service/initial-binder.superpave.service");
const first_compression_service_1 = require("./service/first-compression.service");
const first_curve_percentages_service_1 = require("./service/first-curve-percentages.service");
const chosen_curves_percentages_service_1 = require("./service/chosen-curves-percentages.service");
const second_compression_superpave_service_1 = require("./service/second-compression.superpave.service");
const second_compression_parameters_service_1 = require("./service/second-compression-parameters.service");
const resume_dosage_service_1 = require("./service/resume-dosage.service");
const services = [
    service_1.SuperpaveService,
    general_data_superpave_service_1.GeneralData_Superpave_Service,
    material_selection_superpave_service_1.MaterialSelection_Superpave_Service,
    granulometry_composition_superpave_service_1.GranulometryComposition_Superpave_Service,
    initial_binder_superpave_service_1.InitialBinder_Superpave_Service,
    first_compression_service_1.FirstCompression_Superpave_Service,
    first_curve_percentages_service_1.FirstCurvePercentages_Service,
    chosen_curves_percentages_service_1.ChosenCurvePercentages_Superpave_Service,
    second_compression_superpave_service_1.SecondCompression_Superpave_Service,
    second_compression_parameters_service_1.SecondCompressionParameters_Superpave_Service,
    resume_dosage_service_1.ResumeDosage_Superpave_Service
];
let SuperpaveModule = class SuperpaveModule {
};
exports.SuperpaveModule = SuperpaveModule;
exports.SuperpaveModule = SuperpaveModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.SuperpaveController],
        providers: [...services, repository_1.SuperpaveRepository],
        exports: [service_1.SuperpaveService, repository_1.SuperpaveRepository],
    })
], SuperpaveModule);
//# sourceMappingURL=superpave.module.js.map
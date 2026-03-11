"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABCPModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const service_1 = require("./service");
const general_data_abcp_service_1 = require("./service/general-data.abcp.service");
const material_selection_abcp_service_1 = require("./service/material-selection.abcp.service");
const essay_selection_abcp_service_1 = require("./service/essay-selection.abcp.service");
const calc_abcp_service_1 = require("./service/calc-abcp.service");
const insert_params_abcp_service_1 = require("./service/insert-params.abcp.service");
const services = [
    service_1.ABCPService,
    general_data_abcp_service_1.GeneralData_ABCP_Service,
    material_selection_abcp_service_1.MaterialSelection_ABCP_Service,
    essay_selection_abcp_service_1.EssaySelection_ABCP_Service,
    insert_params_abcp_service_1.InsertParams_ABCP_Service,
    calc_abcp_service_1.Calculate_ABCP_Results_Service
];
let ABCPModule = class ABCPModule {
};
exports.ABCPModule = ABCPModule;
exports.ABCPModule = ABCPModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.ABCPController],
        providers: [...services, repository_1.ABCPRepository],
        exports: [service_1.ABCPService, repository_1.ABCPRepository],
    })
], ABCPModule);
//# sourceMappingURL=abcp.module.js.map
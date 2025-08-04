"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuctilityModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const index_1 = require("./service/index");
const repository_1 = require("./repository");
const calc_ductility_service_1 = require("./service/calc.ductility.service");
const general_data_ductility_service_1 = require("./service/general-data.ductility.service");
const services = [index_1.DuctilityService, general_data_ductility_service_1.GeneralData_DUCTILITY_Service, calc_ductility_service_1.Calc_DUCTILITY_Service];
let DuctilityModule = class DuctilityModule {
};
DuctilityModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.DuctilityController],
        providers: [...services, repository_1.DuctilityRepository],
        exports: [index_1.DuctilityService, repository_1.DuctilityRepository],
    })
], DuctilityModule);
exports.DuctilityModule = DuctilityModule;
//# sourceMappingURL=ductility.module.js.map
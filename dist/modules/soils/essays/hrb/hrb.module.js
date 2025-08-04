"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrbModule = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const general_data_hrb_service_1 = require("./service/general-data.hrb.service");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const calc_hrb_service_1 = require("./service/calc.hrb.service");
const services = [service_1.HrbService, general_data_hrb_service_1.GeneralData_HRB_Service, calc_hrb_service_1.Calc_HRB_Service];
let HrbModule = class HrbModule {
};
HrbModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.HrbController],
        providers: [...services, repository_1.HrbRepository],
        exports: [service_1.HrbService, repository_1.HrbRepository],
    })
], HrbModule);
exports.HrbModule = HrbModule;
//# sourceMappingURL=hrb.module.js.map
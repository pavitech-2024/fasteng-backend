"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapmanModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const champan_service_1 = require("./service/champan.service");
const repository_1 = require("./repository");
const general_data_chapman_service_1 = require("./service/general-data.chapman.service");
const calc_chapman_service_1 = require("./service/calc.chapman.service");
const services = [champan_service_1.ChapmanService, general_data_chapman_service_1.GeneralData_Chapman_Service, calc_chapman_service_1.Calc_CHAPMAN_Service];
let ChapmanModule = class ChapmanModule {
};
ChapmanModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.ChapmanController],
        providers: [...services, repository_1.ChapmanRepository],
        exports: [champan_service_1.ChapmanService, repository_1.ChapmanRepository],
    })
], ChapmanModule);
exports.ChapmanModule = ChapmanModule;
//# sourceMappingURL=champan.module.js.map
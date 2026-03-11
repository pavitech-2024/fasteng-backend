"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeIndexModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const index_1 = require("./service/index");
const repository_1 = require("./repository");
const calc_shapeIndex_service_1 = require("./service/calc.shapeIndex.service");
const general_data_shapeIndex_service_1 = require("./service/general-data.shapeIndex.service");
const services = [index_1.ShapeIndexService, general_data_shapeIndex_service_1.GeneralData_SHAPEINDEX_Service, calc_shapeIndex_service_1.Calc_SHAPEINDEX_Service];
let ShapeIndexModule = class ShapeIndexModule {
};
exports.ShapeIndexModule = ShapeIndexModule;
exports.ShapeIndexModule = ShapeIndexModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.ShapeIndexController],
        providers: [...services, repository_1.ShapeIndexRepository],
        exports: [index_1.ShapeIndexService, repository_1.ShapeIndexRepository],
    })
], ShapeIndexModule);
//# sourceMappingURL=shapeIndex.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IggModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const igg_analysis_schema_1 = require("./schema/igg-analysis.schema");
const igg_analysis_service_1 = require("./service/igg-analysis.service");
const igg_analysis_controller_1 = require("./controller/igg-analysis.controller");
const igg_analysis_repository_1 = require("./repository/igg-analysis.repository");
const database_config_1 = require("../../../infra/mongoose/database.config");
let IggModule = class IggModule {
};
exports.IggModule = IggModule;
exports.IggModule = IggModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: igg_analysis_schema_1.IggAnalysis.name, schema: igg_analysis_schema_1.IggAnalysisSchema }], database_config_1.DATABASE_CONNECTION.PROMEDINA),
        ],
        controllers: [igg_analysis_controller_1.IggAnalysisController],
        providers: [igg_analysis_service_1.IggAnalysisService, igg_analysis_repository_1.IggAnalysisRepository],
        exports: [igg_analysis_service_1.IggAnalysisService],
    })
], IggModule);
//# sourceMappingURL=igg.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FwdModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fwd_analysis_schema_1 = require("./schemas/fwd-analysis.schema");
const fwd_analysis_service_1 = require("./service/fwd-analysis.service");
const fwd_analysis_controller_1 = require("./controllers/fwd-analysis.controller");
const fwd_analysis_repository_1 = require("./repository/fwd-analysis.repository");
const database_config_1 = require("../../../infra/mongoose/database.config");
let FwdModule = class FwdModule {
};
FwdModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: fwd_analysis_schema_1.FwdAnalysis.name, schema: fwd_analysis_schema_1.FwdAnalysisSchema },
            ], database_config_1.DATABASE_CONNECTION.PROMEDINA),
        ],
        controllers: [fwd_analysis_controller_1.FwdAnalysisController],
        providers: [fwd_analysis_service_1.FwdAnalysisService, fwd_analysis_repository_1.FwdAnalysisRepository],
        exports: [fwd_analysis_service_1.FwdAnalysisService],
    })
], FwdModule);
exports.FwdModule = FwdModule;
//# sourceMappingURL=fwd-analysis.module.js.map
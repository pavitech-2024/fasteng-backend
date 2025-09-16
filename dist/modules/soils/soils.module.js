"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoilsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../infra/mongoose/database.config");
const samples_module_1 = require("./samples/samples.module");
const schemas_1 = require("./samples/schemas");
const schemas_2 = require("./essays/cbr/schemas");
const cbr_module_1 = require("./essays/cbr/cbr.module");
const hrb_module_1 = require("./essays/hrb/hrb.module");
const schemas_3 = require("./essays/hrb/schemas");
const schemas_4 = require("./essays/sucs/schemas");
const sucs_module_1 = require("./essays/sucs/sucs.module");
const schemas_5 = require("./essays/granulometry/schemas");
const granulometry_module_1 = require("./essays/granulometry/granulometry.module");
const compression_module_1 = require("./essays/compression/compression.module");
const schema_1 = require("./essays/compression/schema");
const Models = [
    { name: schemas_1.Sample.name, schema: schemas_1.SampleSchema },
    { name: schemas_2.Cbr.name, schema: schemas_2.CbrSchema },
    { name: schemas_3.Hrb.name, schema: schemas_3.HrbSchema },
    { name: schemas_4.Sucs.name, schema: schemas_4.SucsSchema },
    { name: schemas_5.Granulometry.name, schema: schemas_5.GranulometrySchema },
    { name: schema_1.Compression.name, schema: schema_1.CompressionSchema },
];
const Modules = [samples_module_1.SamplesModule, cbr_module_1.CbrModule, hrb_module_1.HrbModule, sucs_module_1.SucsModule, granulometry_module_1.GranulometryModule, compression_module_1.CompressionModule];
let SoilsModule = class SoilsModule {
};
SoilsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(Models, database_config_1.DATABASE_CONNECTION.SOILS), ...Modules],
        exports: [mongoose_1.MongooseModule, ...Modules],
    })
], SoilsModule);
exports.SoilsModule = SoilsModule;
//# sourceMappingURL=soils.module.js.map
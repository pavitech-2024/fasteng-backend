"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProMedinaModule = void 0;
const common_1 = require("@nestjs/common");
const granular_layers_samples_module_1 = require("./granular-layers/samples/granular-layers-samples.module");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("./granular-layers/samples/schemas");
const database_config_1 = require("../../infra/mongoose/database.config");
const granular_layers_module_1 = require("./granular-layers/granular-layers.module");
const schemas_2 = require("./stabilized-layers/samples/schemas");
const stabilized_layers_samples_module_1 = require("./stabilized-layers/samples/stabilized-layers-samples.module");
const stabilized_layers_module_1 = require("./stabilized-layers/stabilized-layers.module");
const binder_asphalt_concrete_module_1 = require("./binder-asphalt-concrete/binder-asphalt-concrete.module");
const schemas_3 = require("./binder-asphalt-concrete/samples/schemas");
const binder_asphalt_concrete_samples_module_1 = require("./binder-asphalt-concrete/samples/binder-asphalt-concrete-samples.module");
const fwd_analysis_schema_1 = require("./fwd/schemas/fwd-analysis.schema");
const fwd_analysis_module_1 = require("./fwd//fwd-analysis.module");
const Models = [
    { name: schemas_1.GranularLayers_Sample.name, schema: schemas_1.GranularLayers_SampleSchema },
    { name: schemas_2.StabilizedLayers_Sample.name, schema: schemas_2.StabilizedLayers_SampleSchema },
    { name: schemas_3.BinderAsphaltConcrete_Sample.name, schema: schemas_3.BinderAsphaltConcrete_SampleSchema },
    { name: fwd_analysis_schema_1.FwdAnalysis.name, schema: fwd_analysis_schema_1.FwdAnalysisSchema },
];
const Modules = [
    granular_layers_samples_module_1.GranularLayersSamplesModule,
    stabilized_layers_samples_module_1.StabilizedLayersSamplesModule,
    binder_asphalt_concrete_samples_module_1.BinderAsphaltConcreteSamplesModule,
    fwd_analysis_module_1.FwdModule,
];
let ProMedinaModule = class ProMedinaModule {
};
ProMedinaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature(Models, database_config_1.DATABASE_CONNECTION.PROMEDINA),
            ...Modules,
            granular_layers_module_1.GranularLayersModule,
            stabilized_layers_module_1.StabilizedLayersModule,
            binder_asphalt_concrete_module_1.BinderAsphaltConcreteModule,
            fwd_analysis_module_1.FwdModule,
        ],
        exports: [mongoose_1.MongooseModule, ...Modules],
    })
], ProMedinaModule);
exports.ProMedinaModule = ProMedinaModule;
//# sourceMappingURL=pro-medina.module.js.map
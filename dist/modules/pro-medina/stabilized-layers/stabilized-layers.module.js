"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StabilizedLayersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../infra/mongoose/database.config");
const schemas_1 = require("./samples/schemas");
const stabilized_layers_samples_module_1 = require("./samples/stabilized-layers-samples.module");
const Models = [{ name: schemas_1.StabilizedLayers_Sample.name, schema: schemas_1.StabilizedLayers_SampleSchema }];
const Modules = [stabilized_layers_samples_module_1.StabilizedLayersSamplesModule];
let StabilizedLayersModule = class StabilizedLayersModule {
};
StabilizedLayersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(Models, database_config_1.DATABASE_CONNECTION.PROMEDINA), ...Modules],
        exports: [mongoose_1.MongooseModule, ...Modules],
    })
], StabilizedLayersModule);
exports.StabilizedLayersModule = StabilizedLayersModule;
//# sourceMappingURL=stabilized-layers.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranularLayersSamplesModule = void 0;
const common_1 = require("@nestjs/common");
const granular_layers_samples_service_1 = require("./service/granular-layers-samples.service");
const repository_1 = require("./repository");
const controller_1 = require("./controller");
let GranularLayersSamplesModule = class GranularLayersSamplesModule {
};
GranularLayersSamplesModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.GranularLayersSamplesController],
        providers: [granular_layers_samples_service_1.GranularLayersSamplesService, repository_1.GranularLayers_SamplesRepository],
        exports: [granular_layers_samples_service_1.GranularLayersSamplesService, repository_1.GranularLayers_SamplesRepository],
    })
], GranularLayersSamplesModule);
exports.GranularLayersSamplesModule = GranularLayersSamplesModule;
//# sourceMappingURL=granular-layers-samples.module.js.map
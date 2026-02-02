"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StabilizedLayersSamplesModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const stabilized_layers_samples_service_1 = require("./service/stabilized-layers-samples.service");
let StabilizedLayersSamplesModule = class StabilizedLayersSamplesModule {
};
exports.StabilizedLayersSamplesModule = StabilizedLayersSamplesModule;
exports.StabilizedLayersSamplesModule = StabilizedLayersSamplesModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.StabilizedLayersSamplesController],
        providers: [stabilized_layers_samples_service_1.StabilizedLayersSamplesService, repository_1.StabilizedLayers_SamplesRepository],
        exports: [stabilized_layers_samples_service_1.StabilizedLayersSamplesService, repository_1.StabilizedLayers_SamplesRepository],
    })
], StabilizedLayersSamplesModule);
//# sourceMappingURL=stabilized-layers-samples.module.js.map
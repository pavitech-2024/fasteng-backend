"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinderAsphaltConcreteSamplesModule = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./repository");
const controller_1 = require("./controller");
const binder_asphalt_concrete_samples_service_1 = require("./service/binder-asphalt-concrete-samples.service");
let BinderAsphaltConcreteSamplesModule = class BinderAsphaltConcreteSamplesModule {
};
exports.BinderAsphaltConcreteSamplesModule = BinderAsphaltConcreteSamplesModule;
exports.BinderAsphaltConcreteSamplesModule = BinderAsphaltConcreteSamplesModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controller_1.BinderAsphaltConcreteSamplesController],
        providers: [binder_asphalt_concrete_samples_service_1.BinderAsphaltConcreteSamplesService, repository_1.BinderAsphaltConcrete_SamplesRepository],
        exports: [binder_asphalt_concrete_samples_service_1.BinderAsphaltConcreteSamplesService, repository_1.BinderAsphaltConcrete_SamplesRepository],
    })
], BinderAsphaltConcreteSamplesModule);
//# sourceMappingURL=binder-asphalt-concrete-samples.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CoarseAggregateController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoarseAggregateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let CoarseAggregateController = CoarseAggregateController_1 = class CoarseAggregateController {
    constructor() {
        this.logger = new common_1.Logger(CoarseAggregateController_1.name);
    }
};
exports.CoarseAggregateController = CoarseAggregateController;
exports.CoarseAggregateController = CoarseAggregateController = CoarseAggregateController_1 = __decorate([
    (0, swagger_1.ApiTags)('coarse-aggregate'),
    (0, common_1.Controller)('soils/essays/coarse-aggregate')
], CoarseAggregateController);
//# sourceMappingURL=index.js.map
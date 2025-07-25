"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperpaveSchema = exports.Superpave = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let Superpave = class Superpave {
};
exports.Superpave = Superpave;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "generalData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "materialSelectionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "granulometryCompositionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "initialBinderData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "firstCompressionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "firstCurvePercentagesData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "chosenCurvePercentagesData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "secondCompressionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "secondCompressionParams", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "confirmationCompressionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Superpave.prototype, "dosageResume", void 0);
exports.Superpave = Superpave = __decorate([
    (0, mongoose_1.Schema)({ collection: 'superpaves' })
], Superpave);
const SuperpaveSchema = mongoose_1.SchemaFactory.createForClass(Superpave);
exports.SuperpaveSchema = SuperpaveSchema;
SuperpaveSchema.set('timestamps', true);
SuperpaveSchema.set('versionKey', false);
//# sourceMappingURL=index.js.map
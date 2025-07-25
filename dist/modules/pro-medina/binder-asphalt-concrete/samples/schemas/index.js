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
exports.BinderAsphaltConcrete_SampleSchema = exports.BinderAsphaltConcrete_Sample = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let BinderAsphaltConcrete_Sample = class BinderAsphaltConcrete_Sample {
};
exports.BinderAsphaltConcrete_Sample = BinderAsphaltConcrete_Sample;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], BinderAsphaltConcrete_Sample.prototype, "generalData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], BinderAsphaltConcrete_Sample.prototype, "step2Data", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], BinderAsphaltConcrete_Sample.prototype, "step3Data", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], BinderAsphaltConcrete_Sample.prototype, "step4Data", void 0);
exports.BinderAsphaltConcrete_Sample = BinderAsphaltConcrete_Sample = __decorate([
    (0, mongoose_1.Schema)({ collection: 'binderAsphaltConcreteSamples', timestamps: true })
], BinderAsphaltConcrete_Sample);
exports.BinderAsphaltConcrete_SampleSchema = mongoose_1.SchemaFactory.createForClass(BinderAsphaltConcrete_Sample);
//# sourceMappingURL=index.js.map
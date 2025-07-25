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
exports.SampleSchema = exports.Sample = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let Sample = class Sample {
};
exports.Sample = Sample;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Sample.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Sample.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Sample.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Sample.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Sample.prototype, "description", void 0);
exports.Sample = Sample = __decorate([
    (0, mongoose_1.Schema)({ collection: 'samples' })
], Sample);
exports.SampleSchema = mongoose_1.SchemaFactory.createForClass(Sample);
//# sourceMappingURL=index.js.map
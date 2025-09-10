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
exports.CreateFwdAnalysisDto = exports.FwdSampleDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FwdSampleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { stationNumber: { required: true, type: () => Number }, d0: { required: true, type: () => Number }, d20: { required: true, type: () => Number }, d30: { required: true, type: () => Number }, d45: { required: true, type: () => Number }, d60: { required: true, type: () => Number }, d90: { required: true, type: () => Number }, d120: { required: true, type: () => Number }, d150: { required: true, type: () => Number }, d180: { required: true, type: () => Number }, date: { required: false, type: () => Date }, airTemperature: { required: false, type: () => Number }, pavementTemperature: { required: false, type: () => Number }, appliedLoad: { required: false, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "stationNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d0", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d20", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d30", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d45", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d60", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d90", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d120", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d150", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "d180", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FwdSampleDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "airTemperature", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "pavementTemperature", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FwdSampleDto.prototype, "appliedLoad", void 0);
exports.FwdSampleDto = FwdSampleDto;
class CreateFwdAnalysisDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, samples: { required: true, type: () => [require("./create-fwd-analysis.dto").FwdSampleDto] }, status: { required: false, type: () => String }, userId: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFwdAnalysisDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFwdAnalysisDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FwdSampleDto),
    __metadata("design:type", Array)
], CreateFwdAnalysisDto.prototype, "samples", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFwdAnalysisDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFwdAnalysisDto.prototype, "userId", void 0);
exports.CreateFwdAnalysisDto = CreateFwdAnalysisDto;
//# sourceMappingURL=create-fwd-analysis.dto.js.map
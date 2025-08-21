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
exports.SaveMaximumMixtureDensityDataDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class MaxSpecificGravityResultDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.45 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "lessOne", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.47 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "lessHalf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.49 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "normal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.51 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "plusHalf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.53 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "plusOne", void 0);
class MaxSpecificGravityDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: MaxSpecificGravityResultDTO }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MaxSpecificGravityResultDTO),
    __metadata("design:type", MaxSpecificGravityResultDTO)
], MaxSpecificGravityDTO.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DMT' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MaxSpecificGravityDTO.prototype, "method", void 0);
class SaveMaximumMixtureDensityDataDTO {
}
exports.SaveMaximumMixtureDensityDataDTO = SaveMaximumMixtureDensityDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dosagem Marshall - Teste 1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SaveMaximumMixtureDensityDataDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MaxSpecificGravityDTO, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MaxSpecificGravityDTO),
    __metadata("design:type", MaxSpecificGravityDTO)
], SaveMaximumMixtureDensityDataDTO.prototype, "maxSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number], required: false, example: [2.65, 2.70, 2.68] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], SaveMaximumMixtureDensityDataDTO.prototype, "listOfSpecificGravities", void 0);
//# sourceMappingURL=save-maximum-mixture-density-data.dto.js.map
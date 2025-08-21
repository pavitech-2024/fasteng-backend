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
exports.GmmValueDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GmmValueDTO {
}
exports.GmmValueDTO = GmmValueDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do item GMM',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GmmValueDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do GMM (opcional)',
        example: 2.45,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GmmValueDTO.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Massa da amostra seca (opcional)',
        example: 1200.5,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GmmValueDTO.prototype, "massOfDrySample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Massa do recipiente + água + amostra (opcional)',
        example: 2500.3,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GmmValueDTO.prototype, "massOfContainerWaterSample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Massa do recipiente + água (opcional)',
        example: 2000.1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GmmValueDTO.prototype, "massOfContainerWater", void 0);
//# sourceMappingURL=gmm-value.dto.js.map
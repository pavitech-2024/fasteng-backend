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
exports.CreateSampleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSampleDto {
}
exports.CreateSampleDto = CreateSampleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome da amostra', example: 'Solo argiloso' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo da amostra',
        example: 'inorganicSoil',
        enum: ['inorganicSoil', 'organicSoil', 'pavementLayer'],
    }),
    (0, class_validator_1.IsIn)(['inorganicSoil', 'organicSoil', 'pavementLayer']),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de construção', example: 'Estrada', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "construction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trecho da amostra', example: 'Trecho 1', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "snippet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Proveniência da amostra', example: 'Local X', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "provenance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estaca associada', example: 'E-23', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "stake", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camada do solo', example: 'Camada superficial', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "layer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Profundidade em cm', example: 30, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSampleDto.prototype, "depth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Exd da amostra', example: 'EXD123', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "exd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data da coleta', example: '2025-08-18' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "collectionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição da amostra', example: 'Solo argiloso coletado próximo à estrada', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "description", void 0);
//# sourceMappingURL=create-sample.dto.js.map
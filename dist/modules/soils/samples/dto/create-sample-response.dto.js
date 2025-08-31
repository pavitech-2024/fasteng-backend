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
exports.SampleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SampleResponseDto {
}
exports.SampleResponseDto = SampleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código único da amostra', example: 'SMP-001' }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome da amostra', example: 'Solo argiloso' }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo da amostra',
        example: 'inorganicSoil',
        enum: ['inorganicSoil', 'organicSoil', 'pavementLayer'],
    }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de construção', example: 'Estrada', required: false }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "construction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trecho da amostra', example: 'Trecho 1', required: false }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "snippet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Proveniência da amostra', example: 'Local X', required: false }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "provenance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estaca associada', example: 'E-23', required: false }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "stake", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camada do solo', example: 'Camada superficial', required: false }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "layer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Profundidade em cm', example: 30, required: false }),
    __metadata("design:type", Number)
], SampleResponseDto.prototype, "depth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Exd da amostra', example: 'EXD123', required: false }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "exd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data da coleta', example: '2025-08-18' }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "collectionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição da amostra', example: 'Solo argiloso coletado próximo à estrada', required: false }),
    __metadata("design:type", String)
], SampleResponseDto.prototype, "description", void 0);
//# sourceMappingURL=create-sample-response.dto.js.map
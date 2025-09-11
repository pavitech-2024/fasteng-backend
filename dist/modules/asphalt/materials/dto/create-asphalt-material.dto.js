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
exports.CreateAsphaltMaterialDto = exports.DescriptionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class DescriptionDto {
}
exports.DescriptionDto = DescriptionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pedreira XYZ', description: 'Fonte do material' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'João da Silva', description: 'Responsável pelo material' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "responsible", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Peneira máxima usada', type: String }),
    __metadata("design:type", Object)
], DescriptionDto.prototype, "maxDiammeter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Granito', description: 'Natureza do agregado' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "aggregateNature", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-20', description: 'Data da compra (ISO string)' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "boughtDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-21', description: 'Data do recebimento (ISO string)' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "recieveDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-18', description: 'Data da extração (ISO string)' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "extractionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-19', description: 'Data da coleta (ISO string)' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "collectionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['CAP 30/45', 'CAP 50/70', 'CAP 85/100', 'CAP 150/200'], description: 'Classificação CAP' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "classification_CAP", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['AMP 50/65', 'AMP 55/75', 'AMP 60/85', 'AMP 65/90'], description: 'Classificação AMP' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "classification_AMP", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Material em boas condições', description: 'Observações gerais' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "observation", void 0);
class CreateAsphaltMaterialDto {
}
exports.CreateAsphaltMaterialDto = CreateAsphaltMaterialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Brita 1', description: 'Nome do material' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAsphaltMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
        description: 'Tipo do material',
        example: 'coarseAggregate',
    }),
    __metadata("design:type", String)
], CreateAsphaltMaterialDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => DescriptionDto, description: 'Informações adicionais do material' }),
    __metadata("design:type", DescriptionDto)
], CreateAsphaltMaterialDto.prototype, "description", void 0);
//# sourceMappingURL=create-asphalt-material.dto.js.map
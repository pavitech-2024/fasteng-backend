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
exports.CreateAsphaltMaterialDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAsphaltMaterialDto {
}
exports.CreateAsphaltMaterialDto = CreateAsphaltMaterialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do material',
        example: 'Brita 1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAsphaltMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo do material',
        enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
        example: 'coarseAggregate',
    }),
    __metadata("design:type", String)
], CreateAsphaltMaterialDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Informações adicionais sobre o material',
        example: {
            source: 'Fornecedor XYZ',
            responsible: 'Eng. João Silva',
            maxDiammeter: '4.8mm',
            aggregateNature: 'Granito',
            boughtDate: '2023-05-10',
            recieveDate: '2023-05-12',
            extractionDate: '2023-05-01',
            collectionDate: '2023-04-28',
            classification_CAP: 'CAP 50/70',
            classification_AMP: 'AMP 55/75',
            observation: 'Material recebido em boas condições',
        },
    }),
    __metadata("design:type", Object)
], CreateAsphaltMaterialDto.prototype, "description", void 0);
//# sourceMappingURL=create-asphalt-material.dto.js.map
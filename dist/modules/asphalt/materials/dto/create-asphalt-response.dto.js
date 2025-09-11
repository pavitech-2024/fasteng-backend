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
exports.ResponseAsphaltMaterialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResponseAsphaltMaterialDto {
}
exports.ResponseAsphaltMaterialDto = ResponseAsphaltMaterialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '64e3f3d8f2a5c0a7b8e3d9f4', description: 'ID do material' }),
    __metadata("design:type", String)
], ResponseAsphaltMaterialDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Brita 1', description: 'Nome do material' }),
    __metadata("design:type", String)
], ResponseAsphaltMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'coarseAggregate',
        description: 'Tipo do material',
        enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
    }),
    __metadata("design:type", String)
], ResponseAsphaltMaterialDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            source: 'Fornecedor XYZ',
            responsible: 'Eng. João Silva',
            maxDiammeter: '4.8mm',
            aggregateNature: 'Granito',
        },
        description: 'Informações adicionais do material',
        required: false,
    }),
    __metadata("design:type", Object)
], ResponseAsphaltMaterialDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-25T19:35:12.123Z', description: 'Data de criação' }),
    __metadata("design:type", Date)
], ResponseAsphaltMaterialDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123', description: 'ID do usuário criador' }),
    __metadata("design:type", String)
], ResponseAsphaltMaterialDto.prototype, "userId", void 0);
//# sourceMappingURL=create-asphalt-response.dto.js.map